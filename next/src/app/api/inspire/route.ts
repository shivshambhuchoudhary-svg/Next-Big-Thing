import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const luxuryInsights = [
    { title: "Dubai Dino Exhibit", detail: "A 155-million-year-old Diplodocus longus, standing majestically in the Grand Atrium.", metric: "7.6m Height" },
    { title: "Jurassic Legacy", detail: "One of the few fossils in the world with nearly all original bones discovered in Wyoming.", metric: "24.4m Length" },
    { title: "Grand Atrium View", detail: "The perfect cinematic angle from the first-floor balcony, capturing the skull against gold accents.", metric: "Best Angle" },
    { title: "Prehistoric Luxury", detail: "Where ancient history meets modern architectural brilliance in the heart of Dubai Mall.", metric: "155M Years" }
  ];
  const randomInsight = luxuryInsights[Math.floor(Math.random() * luxuryInsights.length)];
  
  return NextResponse.json({
    message: "DUBAI DINO CORE CONNECTED",
    insight: randomInsight,
    status: "MUSEUM GRADE",
    timestamp: new Date().toISOString(),
    metrics: {
      age: "155 Million Years",
      completeness: "90%+",
      discovery: "USA (2008)"
    }
  });
}