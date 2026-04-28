"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { BrandItem, EventItem, SponsorItem } from "@/lib/types";

type SlideItem =
  | { kind: "event"; data: EventItem }
  | { kind: "brand"; data: BrandItem }
  | { kind: "sponsor"; data: SponsorItem };

interface Props {
  events: EventItem[];
  brands: BrandItem[];
  sponsors: SponsorItem[];
}

function buildSlides(events: EventItem[], brands: BrandItem[], sponsors: SponsorItem[]): SlideItem[] {
  const slides: SlideItem[] = [];
  for (const e of events) slides.push({ kind: "event", data: e });
  for (const b of brands) slides.push({ kind: "brand", data: b });
  for (const s of sponsors) slides.push({ kind: "sponsor", data: s });
  return slides;
}

function slideHref(slide: SlideItem): string {
  if (slide.kind === "event") return `/events/${slide.data.slug}`;
  if (slide.kind === "brand") return `/brands/${slide.data.slug}`;
  return `/sponsors/${slide.data.slug}`;
}

function slideTag(slide: SlideItem): string {
  if (slide.kind === "event") return "Event";
  if (slide.kind === "brand") return `Brand · Zone ${slide.data.zone}`;
  return "Sponsor";
}

function slideTitle(slide: SlideItem): string {
  if (slide.kind === "event") return slide.data.title;
  if (slide.kind === "brand") return slide.data.name;
  return slide.data.name;
}

function slideSubtitle(slide: SlideItem): string {
  if (slide.kind === "event") return slide.data.shortDescription;
  if (slide.kind === "brand") return slide.data.bio;
  return slide.data.summary;
}

function slideImage(slide: SlideItem): string {
  if (slide.kind === "event") return slide.data.heroImage;
  if (slide.kind === "brand") return slide.data.heroImage;
  return slide.data.heroImage;
}

function slideCta(slide: SlideItem): string {
  if (slide.kind === "event") return "Explore event →";
  if (slide.kind === "brand") return "Visit brand →";
  return "View sponsor →";
}

export function HeroCarousel({ events, brands, sponsors }: Props) {
  const slides = buildSlides(events, brands, sponsors);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function goTo(index: number) {
    if (animating || index === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 400);
  }

  function next() {
    goTo((active + 1) % slides.length);
  }

  function prev() {
    goTo((active - 1 + slides.length) % slides.length);
  }

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active, paused]);

  if (!slides.length) return null;

  const slide = slides[active];
  const href = slideHref(slide);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "88vh", minHeight: 520 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background layers */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${slideImage(s)})`,
            opacity: i === active ? 1 : 0,
            transform: i === active ? "scale(1)" : "scale(1.04)",
            transitionProperty: "opacity, transform",
            transitionDuration: "700ms",
          }}
        />
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Animated noise grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Slide content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="section-shell w-full">
          <div
            className="max-w-2xl transition-all duration-500"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(24px)" : "translateY(0)",
            }}
          >
            {/* Tag pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {slideTag(slide)}
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-5 text-5xl font-black uppercase leading-[1.05] tracking-tight text-white md:text-7xl">
              {slideTitle(slide)}
            </h2>

            {/* Subtitle */}
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300 md:text-lg">
              {slideSubtitle(slide)}
            </p>

            {/* CTA */}
            <Link
              href={href}
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-primaryDark hover:gap-4 hover:shadow-[0_0_32px_rgba(244,197,66,0.4)]"
            >
              {slideCta(slide)}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide counter + dots */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="section-shell flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="group relative h-1 overflow-hidden rounded-full transition-all duration-300"
                style={{ width: i === active ? 40 : 16, background: i === active ? "#f4c542" : "rgba(255,255,255,0.25)" }}
                aria-label={`Go to slide ${i + 1}`}
              >
                {i === active && !paused && (
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-white/40"
                    style={{ animation: "slide-progress 5s linear forwards" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Prev / next */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-primary hover:text-black hover:border-primary"
              aria-label="Previous slide"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-primary hover:text-black hover:border-primary"
              aria-label="Next slide"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Side thumbnail strip */}
      <div className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-16 w-24 overflow-hidden rounded-lg border-2 transition-all duration-300"
            style={{
              borderColor: i === active ? "#f4c542" : "rgba(255,255,255,0.15)",
              opacity: i === active ? 1 : 0.55,
              transform: i === active ? "scale(1.08)" : "scale(1)",
            }}
          >
            <img
              src={slideImage(s)}
              alt={slideTitle(s)}
              className="h-full w-full object-cover"
            />
            {i !== active && (
              <div className="absolute inset-0 bg-black/40" />
            )}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes slide-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
