import type {
  BrandItem,
  DashboardMetric,
  EventItem,
  MediaAsset,
  SponsorItem,
  TalentApplication,
  TeamMember
} from "@/lib/types";

export const mediaAssets: MediaAsset[] = [
  {
    id: "media-1",
    title: "Midnight Souq Hero",
    kind: "carousel",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80",
    altText: "Crowded night bazaar with golden lighting",
    placement: "homepage-hero"
  },
  {
    id: "media-2",
    title: "Founder Story Campaign",
    kind: "campaign",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80",
    altText: "Fashion founder arranging garments on a rack",
    placement: "story-page"
  },
  {
    id: "media-3",
    title: "Audience Moments",
    kind: "gallery",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    altText: "Guests enjoying a live event",
    placement: "site-gallery"
  }
];

export const brands: BrandItem[] = [
  {
    id: "brand-1",
    slug: "atelier-noor",
    name: "Atelier Noor",
    zone: "A",
    boothLocation: "Zone A / Row 1 / Booth 03",
    stockPreview: [
      { name: "Silk Abaya Capsule", quantity: 18 },
      { name: "Structured Kaftan", quantity: 12 },
      { name: "Limited Scarf Edit", quantity: 25 }
    ],
    bio: "A modern modestwear label known for sharp tailoring, tonal palettes, and capsule drops built for premium pop-up retail.",
    heroImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    websiteUrl: "https://example.com/atelier-noor"
  },
  {
    id: "brand-2",
    slug: "terra-form",
    name: "Terra Form",
    zone: "C",
    boothLocation: "Zone C / Row 2 / Booth 11",
    stockPreview: [
      { name: "Ceramic Vessel Set", quantity: 14 },
      { name: "Stoneware Serveware", quantity: 9 },
      { name: "Hand-thrown Lamps", quantity: 7 }
    ],
    bio: "A home and decor studio bringing tactile objects, warm materials, and limited-edition ceramic collections to the marketplace floor.",
    heroImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    websiteUrl: "https://example.com/terra-form"
  },
  {
    id: "brand-3",
    slug: "crumb-studio",
    name: "Crumb Studio",
    zone: "M",
    boothLocation: "Zone M / Row 1 / Booth 02",
    stockPreview: [
      { name: "Signature Cookie Box", quantity: 40 },
      { name: "Matcha Brioche", quantity: 16 },
      { name: "Date Tartlets", quantity: 28 }
    ],
    bio: "A gourmet concept built around small-batch pastries, highly visual presentation, and event-exclusive dessert menus.",
    heroImage: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
    websiteUrl: "https://example.com/crumb"
  }
];

export const sponsors: SponsorItem[] = [
  {
    id: "sponsor-1",
    slug: "lumina-bank",
    name: "Lumina Bank",
    summary: "A premium finance partner supporting emerging brands and founder-led retail experiences.",
    heroImage: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
    ],
    body: [
      "Lumina Bank backs independent founders with flexible business banking, launch support, and partnerships that help small brands look bigger on event day.",
      "For BAZZARNA, the partnership centers on smoother checkout, better founder support, and stronger conversion opportunities for brands during high-traffic weekends."
    ]
  },
  {
    id: "sponsor-2",
    slug: "atlas-studios",
    name: "Atlas Studios",
    summary: "Production and media partner powering campaign storytelling and immersive event visuals.",
    heroImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    ],
    body: [
      "Atlas Studios captures founder stories, event energy, and sponsor campaigns in a way that keeps the BAZZARNA brand polished across digital and physical touchpoints.",
      "Their dedicated sponsor page includes a media gallery, campaign recap, and room for long-form editorial storytelling."
    ]
  }
];

export const events: EventItem[] = [
  {
    id: "event-1",
    slug: "midnight-souq-edition-iii",
    title: "Midnight Souq Edition III",
    shortDescription: "A late-night luxury marketplace with fashion, home, gourmet, and live content moments.",
    longDescription:
      "Midnight Souq Edition III is BAZZARNA's flagship after-dark experience, blending premium brands, live storytelling, curated sponsor activations, and immersive media moments across six zones.",
    startAt: "2026-10-24T18:00:00.000Z",
    endAt: "2026-10-26T23:00:00.000Z",
    locationName: "Downtown Design District",
    googleMapsUrl: "https://maps.google.com/?q=Downtown+Design+District",
    zoneSummary: ["A", "B", "C", "M"],
    heroImage: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=1600&q=80",
    status: "upcoming",
    sponsorIds: ["sponsor-1", "sponsor-2"],
    brandIds: ["brand-1", "brand-2", "brand-3"]
  },
  {
    id: "event-2",
    slug: "winter-market-fest",
    title: "Winter Market Fest",
    shortDescription: "A seasonal pop-up focused on gifting, decor, and warm food experiences.",
    longDescription:
      "Winter Market Fest brings together a colder-season mix of tactile retail, festive sponsor activations, and family-friendly programming designed to keep dwell time high and discovery easy.",
    startAt: "2026-12-05T12:00:00.000Z",
    endAt: "2026-12-10T22:00:00.000Z",
    locationName: "Central Park Pavilion",
    googleMapsUrl: "https://maps.google.com/?q=Central+Park+Pavilion",
    zoneSummary: ["C", "D", "Y"],
    heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    status: "upcoming",
    sponsorIds: ["sponsor-1"],
    brandIds: ["brand-1", "brand-2"]
  }
];

export const talentApplications: TalentApplication[] = [
  {
    id: "talent-1",
    fullName: "Mariam Adel",
    email: "mariam@example.com",
    phone: "+20 100 555 2101",
    category: "Event Host",
    city: "Cairo",
    portfolioUrl: "https://example.com/mariam",
    notes: "Strong hospitality background and bilingual MC experience.",
    status: "pending",
    createdAt: "2026-04-24T09:20:00.000Z"
  },
  {
    id: "talent-2",
    fullName: "Omar Salem",
    email: "omar@example.com",
    phone: "+20 101 333 0098",
    category: "Photographer",
    city: "Alexandria",
    portfolioUrl: "https://example.com/omar",
    notes: "Editorial and event portfolio with nightlife coverage.",
    status: "accepted",
    createdAt: "2026-04-18T13:10:00.000Z"
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: "user-1",
    fullName: "Hesham Omar",
    email: "admin@bazzarna.com",
    role: "main_admin"
  },
  {
    id: "user-2",
    fullName: "Dalia Nabil",
    email: "ops@bazzarna.com",
    role: "operations_staff"
  }
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Upcoming Events",
    value: "2",
    detail: "1 flagship, 1 seasonal activation"
  },
  {
    label: "Attending Brands",
    value: "3",
    detail: "Across 4 active zones"
  },
  {
    label: "Talent Applications",
    value: "2",
    detail: "1 pending review this week"
  },
  {
    label: "Live Media Assets",
    value: "3",
    detail: "Homepage, stories, and sponsor campaigns"
  }
];

export const selectionProcess = [
  "Apply through the internal BAZZARNA form with your experience, role interest, and portfolio links.",
  "The admin team reviews fit, event readiness, and availability against upcoming production needs.",
  "Accepted applicants receive a confirmation email with next steps. Rejections receive a courteous close-out message."
];

