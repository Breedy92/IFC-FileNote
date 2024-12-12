import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';
import { MEETING_PROMPTS } from '@/lib/config';

const sanitizeOptions = {
  allowedTags: ['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li', 'b', 'strong', 'i', 'em'],
  allowedAttributes: {},
  transformTags: {
    '*': function(tagName, attribs) {
      // Convert markdown-style headers to proper HTML
      if (tagName === 'p' && /^#+\s/.test(attribs.textContent)) {
        const level = (attribs.textContent.match(/^#+/)[0] || '').length;
        if (level >= 1 && level <= 3) {
          return {
            tagName: `h${level}`,
            attribs: {}
          };
        }
      }
      return {
        tagName,
        attribs
      };
    }
  }
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
    const { transcript, meetingType } = body;

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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: MEETING_PROMPTS[meetingType as keyof typeof MEETING_PROMPTS]
        },
        {
          role: "user",
          content: transcript
        }
      ],
      temperature: 0.5,
      max_tokens: 2000,
    });

    const summary = completion.choices[0]?.message?.content;
    
    if (!summary) {
      return NextResponse.json(
        { error: 'No summary generated' },
        { status: 500 }
      );
    }

    // Convert markdown-style formatting to HTML
    let processedSummary = summary
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]/g, '$1')
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
      .replace(/^\* (.*?)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h|p|u|o])/gm, '<p>');

    const sanitizedHtml = sanitizeHtml(processedSummary, sanitizeOptions);

    return NextResponse.json({ summary: sanitizedHtml });
  } catch (error) {
    console.error('Error analyzing transcript:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}