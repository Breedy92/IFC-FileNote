// app/api/analyze/route.ts

import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';
import { MEETING_PROMPTS } from '@/lib/config';

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: ['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li', 'b', 'strong', 'i', 'em'],
  allowedAttributes: {},
};

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_CHARS = 15000;

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

    const trimmedTranscript =
      transcript.length > MAX_CHARS
        ? transcript.slice(0, MAX_CHARS)
        : transcript;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-5-mini',
      messages: [
        {
          role: 'system',
          content: MEETING_PROMPTS[meetingType as keyof typeof MEETING_PROMPTS],
        },
        {
          role: 'user',
          content: trimmedTranscript,
        },
      ],
      // no temperature, no max_*tokens – GPT-5 mini is picky about these
    });

    const summary = completion.choices[0]?.message?.content ?? '';

    if (!summary) {
      return NextResponse.json(
        { error: 'No summary generated' },
        { status: 500 }
      );
    }
