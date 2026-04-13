import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const storySections = [
    {
      id: "hero",
      title: "The Epicenter of Now",
      subtitle: "Where global culture meets ultimate luxury.",
      bgType: "video",
      bgUrl: "https://player.vimeo.com/external/494252666.hd.mp4?s=2f5d0d997d67773291f061cc5f496173005d5e12&profile_id=175",
      metric: "",
      metricLabel: ""
    },
    {
      id: "blueprint",
      title: "The Architecture of Awe",
      subtitle: "12 million sq ft of unparalleled retail landscape.",
      bgType: "none",
      isMap: true,
      metric: "12M",
      metricLabel: "Square Feet"
    },
    {
      id: "audience",
      title: "The Global Stage",
      subtitle: "A destination for 80 million annual visitors.",
      bgType: "image",
      bgUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=1920",
      metric: "80M+",
      metricLabel: "Annual Footfall"
    },
    {
      id: "canvas",
      title: "Your Unrivaled Canvas",
      subtitle: "From Fashion Avenue to the Grand Atrium.",
      bgType: "image",
      bgUrl: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=1920",
      metric: "1,200+",
      metricLabel: "Global Brands"
    }
  ];

  return NextResponse.json({
    sections: storySections,
    cta: {
      title: "The Future Awaits Your Brand",
      subtitle: "Secure your presence in the world's most visited retail and entertainment destination.",
      primaryAction: "Event Bookings",
      secondaryAction: "Brand Activations"
    }
  });
}