create extension if not exists pgcrypto;

create table if not exists public.roles (
  name text primary key,
  description text not null
);

create table if not exists public.role_permissions (
  id uuid primary key default gen_random_uuid(),
  role_name text not null references public.roles(name) on delete cascade,
  permission text not null,
  unique (role_name, permission)
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  role_name text not null references public.roles(name) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_description text default '',
  long_description text default '',
  start_at timestamptz not null,
  end_at timestamptz not null,
  location_name text not null,
  google_maps_url text default '',
  zone_summary text[] not null default '{}',
  hero_image_url text default '',
  status text not null default 'upcoming' check (status in ('upcoming', 'live', 'past')),
  sponsor_ids uuid[] not null default '{}',
  brand_ids uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  zone text not null check (zone in ('A', 'B', 'C', 'D', 'M', 'Y')),
  booth_location text not null,
  stock_preview jsonb not null default '[]'::jsonb,
  bio text default '',
  hero_image_url text default '',
  website_url text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.event_brands (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  brand_id uuid not null references public.brands(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (event_id, brand_id)
);

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  summary text default '',
  hero_image_url text default '',
  gallery jsonb not null default '[]'::jsonb,
  body jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  kind text not null check (kind in ('carousel', 'gallery', 'campaign')),
  image_url text not null,
  alt_text text default '',
  placement text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.talent_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  category text not null,
  city text not null,
  portfolio_url text default '',
  notes text default '',
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.event_notifications (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = excluded.full_name;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.has_role(role_to_check text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role_name = role_to_check
  );
$$;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.events enable row level security;
alter table public.brands enable row level security;
alter table public.event_brands enable row level security;
alter table public.sponsors enable row level security;
alter table public.media_assets enable row level security;
alter table public.talent_applications enable row level security;
alter table public.event_notifications enable row level security;

drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read"
on public.profiles
for select
to authenticated
using (auth.uid() = id or public.has_role('main_admin'));

drop policy if exists "main admin manages profiles" on public.profiles;
create policy "main admin manages profiles"
on public.profiles
for all
to authenticated
using (public.has_role('main_admin'))
with check (public.has_role('main_admin'));

drop policy if exists "main admin manages roles" on public.user_roles;
create policy "main admin manages roles"
on public.user_roles
for all
to authenticated
using (public.has_role('main_admin'))
with check (public.has_role('main_admin'));

drop policy if exists "public read events" on public.events;
create policy "public read events"
on public.events
for select
to anon, authenticated
using (true);

drop policy if exists "staff manage events" on public.events;
create policy "staff manage events"
on public.events
for all
to authenticated
using (public.has_role('main_admin') or public.has_role('operations_staff'))
with check (public.has_role('main_admin') or public.has_role('operations_staff'));

drop policy if exists "public read brands" on public.brands;
create policy "public read brands"
on public.brands
for select
to anon, authenticated
using (true);

drop policy if exists "staff manage brands" on public.brands;
create policy "staff manage brands"
on public.brands
for all
to authenticated
using (public.has_role('main_admin') or public.has_role('operations_staff'))
with check (public.has_role('main_admin') or public.has_role('operations_staff'));

drop policy if exists "staff manage event brands" on public.event_brands;
create policy "staff manage event brands"
on public.event_brands
for all
to authenticated
using (public.has_role('main_admin') or public.has_role('operations_staff'))
with check (public.has_role('main_admin') or public.has_role('operations_staff'));

drop policy if exists "public read sponsors" on public.sponsors;
create policy "public read sponsors"
on public.sponsors
for select
to anon, authenticated
using (true);

drop policy if exists "staff manage sponsors" on public.sponsors;
create policy "staff manage sponsors"
on public.sponsors
for all
to authenticated
using (public.has_role('main_admin') or public.has_role('operations_staff'))
with check (public.has_role('main_admin') or public.has_role('operations_staff'));

drop policy if exists "public read media assets" on public.media_assets;
create policy "public read media assets"
on public.media_assets
for select
to anon, authenticated
using (true);

drop policy if exists "staff manage media assets" on public.media_assets;
create policy "staff manage media assets"
on public.media_assets
for all
to authenticated
using (public.has_role('main_admin') or public.has_role('operations_staff'))
with check (public.has_role('main_admin') or public.has_role('operations_staff'));

drop policy if exists "public submit talent applications" on public.talent_applications;
create policy "public submit talent applications"
on public.talent_applications
for insert
to anon, authenticated
with check (true);

drop policy if exists "staff read talent applications" on public.talent_applications;
create policy "staff read talent applications"
on public.talent_applications
for select
to authenticated
using (public.has_role('main_admin') or public.has_role('operations_staff'));

drop policy if exists "staff update talent applications" on public.talent_applications;
create policy "staff update talent applications"
on public.talent_applications
for update
to authenticated
using (public.has_role('main_admin') or public.has_role('operations_staff'))
with check (public.has_role('main_admin') or public.has_role('operations_staff'));

drop policy if exists "public submit event notifications" on public.event_notifications;
create policy "public submit event notifications"
on public.event_notifications
for insert
to anon, authenticated
with check (true);

drop policy if exists "staff read event notifications" on public.event_notifications;
create policy "staff read event notifications"
on public.event_notifications
for select
to authenticated
using (public.has_role('main_admin') or public.has_role('operations_staff'));

insert into public.roles (name, description)
values
  ('main_admin', 'Full control across users, roles, permissions, and all content types.'),
  ('operations_staff', 'Operational event content management without user administration.')
on conflict (name) do nothing;

insert into public.role_permissions (role_name, permission)
values
  ('main_admin', 'users.manage'),
  ('main_admin', 'roles.manage'),
  ('main_admin', 'events.manage'),
  ('main_admin', 'brands.manage'),
  ('main_admin', 'brands.stock'),
  ('main_admin', 'event_brands.manage'),
  ('main_admin', 'sponsors.manage'),
  ('main_admin', 'media.manage'),
  ('main_admin', 'talent.review'),
  ('operations_staff', 'events.manage'),
  ('operations_staff', 'brands.manage'),
  ('operations_staff', 'event_brands.manage'),
  ('operations_staff', 'sponsors.manage'),
  ('operations_staff', 'media.manage'),
  ('operations_staff', 'talent.review')
on conflict (role_name, permission) do nothing;

