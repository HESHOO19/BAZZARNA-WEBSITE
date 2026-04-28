export type RoleName = "main_admin" | "operations_staff" | "guest";

export type EventStatus = "upcoming" | "live" | "past";

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  startAt: string;
  endAt: string;
  locationName: string;
  googleMapsUrl: string;
  zoneSummary: string[];
  heroImage: string;
  status: EventStatus;
  sponsorIds: string[];
  brandIds: string[];
};

export type BrandItem = {
  id: string;
  slug: string;
  name: string;
  zone: "A" | "B" | "C" | "D" | "M" | "Y";
  boothLocation: string;
  stockPreview: Array<{ name: string; quantity: number }>;
  bio: string;
  heroImage: string;
  websiteUrl?: string;
};

export type SponsorItem = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  heroImage: string;
  gallery: string[];
  body: string[];
};

export type MediaAsset = {
  id: string;
  title: string;
  kind: "carousel" | "gallery" | "campaign";
  imageUrl: string;
  altText: string;
  placement: string;
};

export type TalentApplication = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  category: string;
  city: string;
  portfolioUrl: string;
  notes: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
};

export type TeamMember = {
  id: string;
  fullName: string;
  email: string;
  role: RoleName;
};

