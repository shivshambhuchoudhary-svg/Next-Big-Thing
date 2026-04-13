import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const storySections = [
    {
      id: "hero",
      title: "The Epicenter of Now",
      subtitle: "Where global culture meets ultimate luxury.",
      bgType: "video",
      bgUrl: "https://player.vimeo.com/external/494252666.hd.mp4?s=2f5d0d997d67773291f061cc5f496173005d5e12&profile_id=175", // Cinematic Fountain/Dubai Placeholder
      metric: "",
      metricLabel: ""
    },
    {
      id: "audience",
      title: "The Global Stage",
      subtitle: "A destination for 80 million annual visitors.",
      bgType: "image",
      bgUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=1920", // High-end Dubai crowd
      metric: "80M+",
      metricLabel: "Annual Footfall"
    },
    {
      id: "canvas",
      title: "Your Unrivaled Canvas",
      subtitle: "From Fashion Avenue to the Grand Atrium.",
      bgType: "image",
      bgUrl: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=1920", // Luxury Mall Interior
      metric: "1,200+",
      metricLabel: "Global Brands"
    },
    {
      id: "activations",
      title: "The Future of Activations",
      subtitle: "Immersive experiences that define modern retail.",
      bgType: "video",
      bgUrl: "https://player.vimeo.com/external/459389137.hd.mp4?s=87ae30432bc273d49495333580552b07d57a9094&profile_id=172", // Digital Art/Activation Placeholder
      metric: "1.2B",
      metricLabel: "Social Impressions"
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