// app/api/analyse-transcript/route.ts (or whatever your route path is)

import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';
import { MEETING_PROMPTS } from '@/lib/config';

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: ['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li', 'b', 'strong', 'i', 'em'],
  allowedAttributes: {},
};

export const runtime = 'edge';

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

    // Basic validation
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

    // Responses API with GPT-5
    const response = await openai.responses.create({
      model: 'gpt-5',
      temperature: 0.4,
      input: [
        {
          role: 'developer',
          content: MEETING_PROMPTS[meetingType as keyof typeof MEETING_PROMPTS],
        },
        {
          role: 'user',
          content: transcript,
        },
      ],
      // You *can* add max_output_tokens if you want a hard cap:
      // max_output_tokens: 2000,
    });

    // Per docs: this aggregates all text outputs into a single string
    const summary = response.output_text;

    if (!summary || typeof summary !== 'string') {
      return NextResponse.json(
        { error: 'No summary generated' },
        { status: 500 }
      );
    }

    // --- Markdown-ish → HTML pass ---
    let processedSummary = summary
      // **bold** → <strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // [text] → text (strip square brackets)
      .replace(/\[(.*?)\]/g, '$1')
      // Headings
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
      // Bullet points "* " → <li>
      .replace(/^\* (.*?)$/gm, '<li>$1</li>')
      // Paragraph breaks
      .replace(/\n\n+/g, '</p><p>');

    // Wrap in <p> if it doesn't start with a block tag already
    if (!/^<(h1|h2|h3|p|ul|ol|li)/i.test(processedSummary.trim())) {
      processedSummary = `<p>${processedSummary}</p>`;
    }

    // Final sanitise so nothing nasty slips through
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
