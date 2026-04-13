import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const inspirations = [
    "The best way to predict the future is to create it.",
    "Your potential is endless.",
    "Keep pushing forward. The Next Big Thing is just around the corner.",
    "Innovation is the bridge to the future.",
    "Small steps lead to big dreams.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Believe you can and you're halfway there.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts."
  ];
  const randomInspire = inspirations[Math.floor(Math.random() * inspirations.length)];
  
  return NextResponse.json({
    message: "Success! You've connected to the NEXT core.",
    inspiration: randomInspire,
    status: "Active & Evolving",
    timestamp: new Date().toISOString()
  });
}