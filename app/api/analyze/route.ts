// app/api/analyze/route.ts

import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';
import { MEETING_PROMPTS } from '@/lib/config';

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: ['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li', 'b', 'strong', 'i', 'em'],
  allowedAttributes: {},
};

// ⬅️ IMPORTANT: use nodejs, not edge
export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { transcript, meetingType } = body as {
      transcript?: string;
      meetingType?: string;
    };

    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: 'Please provide a valid transcript' },
        { status: 400 }
      );
    }

    if (!meetingType || !MEETING_PROMPTS[meetingType as keyof typeof MEETING_PROMPTS]) {
      return NextResponse.json(
        { error: 'Please provide a valid meeting type' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // No temperature, no max_*tokens – nano doesn’t like them in your setup
    const completion = await openai.chat.completions.create({
      model: 'gpt-5-nano',
      messages: [
        {
          role: 'system',
          content: MEETING_PROMPTS[meetingType as keyof typeof MEETING_PROMPTS],
        },
        {
          role: 'user',
          content: transcript,
        },
      ],
    });

    const summary = completion.choices?.[0]?.message?.content ?? '';

    if (!summary) {
      return NextResponse.json(
        { error: 'No summary generated' },
        { status: 500 }
      );
    }

    // --- Markdown-ish → HTML ---
    let processedSummary = summary
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]/g, '$1')
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
      .replace(/^\* (.*?)$/gm, '<li>$1</li>')
      .replace(/\n\n+/g, '</p><p>');

    if (!/^<(h1|h2|h3|p|ul|ol|li)/i.test(processedSummary.trim())) {
      processedSummary = `<p>${processedSummary}</p>`;
    }

    const sanitizedHtml = sanitizeHtml(processedSummary, sanitizeOptions);

    return NextResponse.json({ summary: sanitizedHtml });
  } catch (error) {
    console.error('Error analyzing transcript:', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
