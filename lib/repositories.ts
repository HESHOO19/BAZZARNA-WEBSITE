import { getCurrentRole } from "@/lib/auth";
import {
  brands,
  dashboardMetrics,
  events,
  mediaAssets,
  sponsors,
  talentApplications,
  teamMembers
} from "@/lib/site-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  BrandItem,
  DashboardMetric,
  EventItem,
  MediaAsset,
  SponsorItem,
  TalentApplication,
  TeamMember
} from "@/lib/types";

function mapEvent(row: Record<string, unknown>): EventItem {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    shortDescription: String(row.short_description ?? ""),
    longDescription: String(row.long_description ?? ""),
    startAt: String(row.start_at),
    endAt: String(row.end_at),
    locationName: String(row.location_name),
    googleMapsUrl: String(row.google_maps_url ?? ""),
    zoneSummary: Array.isArray(row.zone_summary) ? (row.zone_summary as string[]) : [],
    heroImage: String(row.hero_image_url ?? ""),
    status: String(row.status ?? "upcoming") as EventItem["status"],
    sponsorIds: Array.isArray(row.sponsor_ids) ? (row.sponsor_ids as string[]) : [],
    brandIds: Array.isArray(row.brand_ids) ? (row.brand_ids as string[]) : []
  };
}

function mapBrand(row: Record<string, unknown>): BrandItem {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    zone: String(row.zone ?? "A") as BrandItem["zone"],
    boothLocation: String(row.booth_location ?? ""),
    stockPreview: Array.isArray(row.stock_preview)
      ? (row.stock_preview as Array<{ name: string; quantity: number }>)
      : [],
    bio: String(row.bio ?? ""),
    heroImage: String(row.hero_image_url ?? ""),
    websiteUrl: row.website_url ? String(row.website_url) : undefined
  };
}

function mapSponsor(row: Record<string, unknown>): SponsorItem {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    summary: String(row.summary ?? ""),
    heroImage: String(row.hero_image_url ?? ""),
    gallery: Array.isArray(row.gallery) ? (row.gallery as string[]) : [],
    body: Array.isArray(row.body) ? (row.body as string[]) : []
  };
}

function mapMedia(row: Record<string, unknown>): MediaAsset {
  return {
    id: String(row.id),
    title: String(row.title),
    kind: String(row.kind ?? "gallery") as MediaAsset["kind"],
    imageUrl: String(row.image_url ?? ""),
    altText: String(row.alt_text ?? ""),
    placement: String(row.placement ?? "")
  };
}

function mapTalent(row: Record<string, unknown>): TalentApplication {
  return {
    id: String(row.id),
    fullName: String(row.full_name),
    email: String(row.email),
    phone: String(row.phone ?? ""),
    category: String(row.category ?? ""),
    city: String(row.city ?? ""),
    portfolioUrl: String(row.portfolio_url ?? ""),
    notes: String(row.notes ?? ""),
    status: String(row.status ?? "pending") as TalentApplication["status"],
    createdAt: String(row.created_at ?? new Date().toISOString())
  };
}

async function getSupabase() {
  return createSupabaseServerClient();
}

export async function getEvents() {
  const supabase = await getSupabase();

  if (!supabase) return events;

  const { data, error } = await supabase.from("events").select("*").order("start_at", { ascending: true });
  if (error || !data) return events;
  return data.map((row) => mapEvent(row as Record<string, unknown>));
}

export async function getEventBySlug(slug: string) {
  const eventList = await getEvents();
  return eventList.find((item) => item.slug === slug) ?? null;
}

export async function getBrands() {
  const supabase = await getSupabase();

  if (!supabase) return brands;

  const role = await getCurrentRole();
  const { data, error } = await supabase.from("brands").select("*").order("name");
  if (error || !data) return brands;

  return data.map((row) => {
    const brand = mapBrand(row as Record<string, unknown>);
    if (role !== "main_admin") {
      return {
        ...brand,
        stockPreview: brand.stockPreview
      };
    }
    return brand;
  });
}

export async function getBrandBySlug(slug: string) {
  const brandList = await getBrands();
  return brandList.find((item) => item.slug === slug) ?? null;
}

export async function getSponsors() {
  const supabase = await getSupabase();

  if (!supabase) return sponsors;

  const { data, error } = await supabase.from("sponsors").select("*").order("name");
  if (error || !data) return sponsors;
  return data.map((row) => mapSponsor(row as Record<string, unknown>));
}

export async function getSponsorBySlug(slug: string) {
  const sponsorList = await getSponsors();
  return sponsorList.find((item) => item.slug === slug) ?? null;
}

export async function getMediaAssets() {
  const supabase = await getSupabase();

  if (!supabase) return mediaAssets;

  const { data, error } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false });
  if (error || !data) return mediaAssets;
  return data.map((row) => mapMedia(row as Record<string, unknown>));
}

export async function getTalentApplications() {
  const supabase = await getSupabase();

  if (!supabase) return talentApplications;

  const { data, error } = await supabase
    .from("talent_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return talentApplications;
  return data.map((row) => mapTalent(row as Record<string, unknown>));
}

export async function getDashboardMetrics(): Promise<DashboardMetric[]> {
  const eventList = await getEvents();
  const brandList = await getBrands();
  const talentList = await getTalentApplications();
  const mediaList = await getMediaAssets();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return dashboardMetrics;
  }

  return [
    {
      label: "Upcoming Events",
      value: String(eventList.length),
      detail: `${eventList.filter((item) => item.status === "upcoming").length} upcoming`
    },
    {
      label: "Attending Brands",
      value: String(brandList.length),
      detail: "Brand roster across active zones"
    },
    {
      label: "Talent Applications",
      value: String(talentList.length),
      detail: `${talentList.filter((item) => item.status === "pending").length} pending`
    },
    {
      label: "Live Media Assets",
      value: String(mediaList.length),
      detail: "Carousel, gallery, and campaign placements"
    }
  ];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const supabase = await getSupabase();

  if (!supabase) return teamMembers;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, user_roles(role_name)");

  if (error || !data) return teamMembers;

  return data.map((row) => ({
    id: String((row as { id: string }).id),
    fullName: String((row as { full_name?: string }).full_name ?? ""),
    email: String((row as { email?: string }).email ?? ""),
    role: (() => {
      const rawRoles = (row as { user_roles?: Array<{ role_name: string }> | { role_name: string } }).user_roles;
      if (Array.isArray(rawRoles)) {
        return (rawRoles[0]?.role_name ?? "guest") as TeamMember["role"];
      }
      return ((rawRoles as { role_name?: string } | undefined)?.role_name ?? "guest") as TeamMember["role"];
    })()
  }));
}
