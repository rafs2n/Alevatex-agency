
/**
 * AlevateX Content Store
 * Updated with Legal Content, Socials, and Client Logos.
 */

export const siteConfig = {
  name: "AlevateX",
  email: "hello@alevatex.com",
  phone: "+880 1829-739091",
  whatsapp: "https://wa.me/8801829739091",
  address: "Level 4, Tech Park, Silicon Valley of Asia",
  contactFormEndpoint: "https://formspree.io/f/xeeojndp",
  socials: {
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  }
};

export const navigation = [
  { name: "Home", href: "home" },
  { name: "About", href: "about" },
  { name: "Portfolio", href: "portfolio" },
  { name: "Contact", href: "contact" },
];

export const clientLogos = [
  "APPLE", "AIRBNB", "SPOTIFY", "ADIDAS", "KODAK", "PANTENE"
];

export interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'archived';
}

export const heroContent = {
  headline: "Elevating Brands Beyond Boundaries.",
  subheadline: "AlevateX is a premier digital growth engine. We fuse avant-garde design with data-driven strategy to scale international brands from vision to viral dominance.",
  ctaPrimary: "Get a Free Quote",
  ctaSecondary: "View Our Work",
  stats: {
    trustedBy: "2300",
    suffix: "+",
    label: "Happy customers",
    rating: "5.0",
    avatars: [
      "https://i.pravatar.cc/150?u=1",
      "https://i.pravatar.cc/150?u=2",
      "https://i.pravatar.cc/150?u=3",
      "https://i.pravatar.cc/150?u=4"
    ]
  }
};

export const legalContent = {
  privacy: {
    lastUpdated: "October 24, 2024",
    sections: [
      {
        title: "Information Collection",
        content: "At AlevateX, we collect information to provide better services to our clients. This includes information you provide us (like your name and email when you contact us) and information we get from your use of our services (like usage data via cookies)."
      },
      {
        title: "How We Use Data",
        content: "We use the collected data to maintain, protect, and improve our services, to develop new ones, and to protect AlevateX and our users. We also use this information to offer you tailored content—like giving you more relevant project updates."
      },
      {
        title: "Data Security",
        content: "We work hard to protect AlevateX and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We use SSL encryption and restrict access to personal information to AlevateX employees who need to know that information."
      },
      {
        title: "Your Rights",
        content: "You have the right to access, update, or delete the information we have on you. Whenever you use our services, we aim to provide you with access to your personal information."
      }
    ]
  },
  terms: {
    lastUpdated: "October 24, 2024",
    sections: [
      {
        title: "Service Agreement",
        content: "By accessing AlevateX services, you agree to be bound by these terms. Our services include but are not limited to branding, digital marketing, video production, and web development. Each project will have a specific Scope of Work (SOW) that details the deliverables."
      },
      {
        title: "Intellectual Property",
        content: "Unless otherwise agreed in writing, all creative work produced by AlevateX remains the property of AlevateX until full payment is received. Upon final payment, ownership of the final deliverables is transferred to the client, while AlevateX retains the right to showcase the work in our portfolio."
      },
      {
        title: "Payment Terms",
        content: "Projects typically require an upfront deposit (e.g., 50%) before work commences. Final files or website launches occur only after the remaining balance is settled. Late payments may incur administrative fees."
      },
      {
        title: "Liability & Warranty",
        content: "AlevateX strives for excellence but cannot guarantee specific viral results or third-party platform performance (like Facebook algorithm changes). We are not liable for any indirect or consequential loss arising from the use of our deliverables."
      }
    ]
  }
};

export const aboutPageContent = {
  title: "Who We Are",
  description: "AlevateX is a creative powerhouse dedicated to transforming digital landscapes. We aren't just an agency; we are your strategic partners in digital evolution. We combine high-end aesthetics with technical precision to build brands that matter.",
  visionTitle: "Our Vision",
  visionDescription: "To become the global benchmark for digital innovation and brand storytelling, empowering businesses to reach their peak potential through disruptive creativity and data-backed strategies.",
};

export const teamMembers = [
  {
    name: "Abdul Aziz",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=1000",
  },
  {
    name: "Sofia R.",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    name: "Alex M.",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
  }
];

export const services = [
  {
    id: "graphics",
    title: "Visual Identity & Graphic Design",
    description: "We don't just design; we define. Crafting timeless visual identities that resonate deeply and leave a lasting imprint on your industry.",
    details: "Logo design, Brand style guides, Marketing collateral, and Premium UI/UX visual assets.",
    icon: "Palette"
  },
  {
    id: "ads",
    title: "Performance Marketing (Meta Ads)",
    description: "ROI is our language. We engineer high-converting Facebook and Instagram campaigns that turn casual browsers into loyal customers.",
    details: "Precision targeting, A/B testing, Creative optimization, and Real-time analytics reporting.",
    icon: "TrendingUp"
  },
  {
    id: "video",
    title: "Cinematic Video Production",
    description: "Storytelling redefined. We capture attention in the first 3 seconds with cinematic editing and motion graphics that demand engagement.",
    details: "Short-form content (Reels/TikTok), High-end brand commercials, and Professional post-production.",
    icon: "Video"
  },
  {
    id: "web",
    title: "Next-Gen Web Development",
    description: "Blazing fast, SEO-optimized, and infinitely scalable. We build digital experiences that function as high-performance sales machines.",
    details: "Custom React/Next.js development, E-commerce solutions, and Conversion Rate Optimization (CRO).",
    icon: "Code"
  }
];

export const portfolioCategories = ["All", "Graphics", "Web Design", "Video", "Motion"];

export interface Project {
  title: string;
  category: string;
  description: string;
  type: 'image' | 'video';
  thumbnail: string;
  images?: string[];
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Urban Streetwear Edit",
    category: "Video",
    description: "High-paced cinematic editing for an urban fashion line.",
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/PJxoR2l-r-U"
  },
  {
    title: "Tech Innovation Showcase",
    category: "Video",
    description: "Sleek product reveal with premium motion graphics.",
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/fLonJKaTQqM"
  },
  {
    title: "Luxury Lifestyle Campaign",
    category: "Video",
    description: "Capturing the essence of luxury through cinematic storytelling.",
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/ypuNjzuyAy0"
  },
  {
    title: "Dynamic Motion Reel",
    category: "Motion",
    description: "A compilation of our best motion design and brand animations.",
    type: 'video',
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/qfrs9lI6a88"
  },
  {
    title: "Neon E-commerce Platform",
    category: "Web Design",
    description: "A futuristic shopping experience for a luxury streetwear brand.",
    type: 'image',
    thumbnail: "https://picsum.photos/800/600?random=1",
    images: [
      "https://picsum.photos/1200/800?random=11",
      "https://picsum.photos/1200/800?random=12",
      "https://picsum.photos/1200/800?random=13"
    ]
  },
  {
    title: "TechFin Brand Identity",
    category: "Graphics",
    description: "Complete visual identity for a Silicon Valley fintech disruptor.",
    type: 'image',
    thumbnail: "https://picsum.photos/800/600?random=2",
    images: [
      "https://picsum.photos/1200/800?random=21",
      "https://picsum.photos/1200/800?random=22"
    ]
  },
  {
    title: "Lunar Social Campaign",
    category: "Graphics",
    description: "A viral TikTok/Reels visual kit reaching 1M+ views.",
    type: 'image',
    thumbnail: "https://picsum.photos/800/600?random=4",
    images: [
      "https://picsum.photos/1200/800?random=41",
      "https://picsum.photos/1200/800?random=42",
      "https://picsum.photos/1200/800?random=43",
      "https://picsum.photos/1200/800?random=44"
    ]
  }
];

export const testimonials = [
  {
    name: "Alexander Vance",
    role: "CEO of Vance Media",
    content: "AlevateX didn't just meet our expectations—they redefined what we thought was possible. Our brand engagement skyrocketed by 300% within the first month.",
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  {
    name: "Sarah Jenkins",
    role: "Founder, LuxeBloom",
    content: "The web experience AlevateX built for us is a work of art. It's fast, intuitive, and most importantly, it converts. They are true partners in our growth.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Marcus Thorne",
    role: "CMO, TechPulse Solutions",
    content: "Their video production team is world-class. The cinematic storytelling they brought to our product launch was the key driver in our record-breaking pre-orders.",
    avatar: "https://i.pravatar.cc/150?u=marcus"
  }
];

export const footerContent = {
  description: "Crafting digital legacies for the world's most ambitious brands. AlevateX – Where Vision Meets Velocity.",
  copyright: "© 2024 AlevateX. All Rights Reserved."
};
