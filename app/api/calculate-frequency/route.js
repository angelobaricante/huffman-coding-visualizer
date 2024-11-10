import { NextResponse } from 'next/server';

export async function POST(request) {
  const { text } = await request.json();

  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 });
  }

  const frequencyData = calculateFrequency(text);
  return NextResponse.json(frequencyData);
}

function calculateFrequency(text) {
  const freq = {};
  for (const char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return Object.entries(freq).map(([char, count]) => ({ char, count }));
}