insert into public.brands (slug, name, zone, booth_location, stock_preview, bio, hero_image_url, website_url)
values
  (
    'atelier-noor',
    'Atelier Noor',
    'A',
    'Zone A / Row 1 / Booth 03',
    '[{"name":"Silk Abaya Capsule","quantity":18},{"name":"Structured Kaftan","quantity":12},{"name":"Limited Scarf Edit","quantity":25}]'::jsonb,
    'A modern modestwear label known for sharp tailoring and event-ready capsule drops.',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    'https://example.com/atelier-noor'
  ),
  (
    'terra-form',
    'Terra Form',
    'C',
    'Zone C / Row 2 / Booth 11',
    '[{"name":"Ceramic Vessel Set","quantity":14},{"name":"Stoneware Serveware","quantity":9}]'::jsonb,
    'A tactile home and decor studio with limited-edition ceramics and warm material palettes.',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    'https://example.com/terra-form'
  )
on conflict (slug) do nothing;

insert into public.sponsors (slug, name, summary, hero_image_url, gallery, body)
values
  (
    'lumina-bank',
    'Lumina Bank',
    'A premium finance partner supporting emerging brands and founder-led retail experiences.',
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80',
    '["https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
    '["Lumina Bank backs independent founders with flexible business banking and checkout support."]'::jsonb
  )
on conflict (slug) do nothing;

insert into public.events (
  slug,
  title,
  short_description,
  long_description,
  start_at,
  end_at,
  location_name,
  google_maps_url,
  zone_summary,
  hero_image_url,
  status
)
values
  (
    'midnight-souq-edition-iii',
    'Midnight Souq Edition III',
    'A late-night luxury marketplace with fashion, home, gourmet, and live content moments.',
    'Midnight Souq Edition III is BAZZARNA''s flagship after-dark experience, blending premium brands, sponsor activations, and immersive storytelling.',
    '2026-10-24T18:00:00.000Z',
    '2026-10-26T23:00:00.000Z',
    'Downtown Design District',
    'https://maps.google.com/?q=Downtown+Design+District',
    '{"A","B","C","M"}',
    'https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=1600&q=80',
    'upcoming'
  )
on conflict (slug) do nothing;

insert into public.media_assets (title, kind, image_url, alt_text, placement)
values
  (
    'Midnight Souq Hero',
    'carousel',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=80',
    'Crowded night bazaar with golden lighting',
    'homepage-hero'
  )
on conflict do nothing;

