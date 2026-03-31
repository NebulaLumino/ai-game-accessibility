import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { input } = await req.json();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.deepseek.com/v1",
  });
  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      { role: "system", content: "You are an expert accessibility designer. Create game accessibility modifications and accommodations for players with disabilities." },
      { role: "user", content: input },
    ],
  });
  return NextResponse.json({ output: completion.choices[0].message.content });
}
