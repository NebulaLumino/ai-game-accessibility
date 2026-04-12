import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) return NextResponse.json({ error: "No prompt" }, { status: 400 });

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.deepseek.com/v1",
  });

  const completion = await client.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      { role: "system", content: "You are an accessibility auditor. Review a game's accessibility features across vision, hearing, motor, and cognitive categories. Provide specific, actionable recommendations with implementation priority." },
      { role: "user", content: prompt },
    ],
    max_tokens: 1200,
    temperature: 0.82,
  });

  return NextResponse.json({ result: completion.choices[0].message.content });
}
