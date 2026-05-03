create extension if not exists "pgcrypto";

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null,
  created_at timestamptz not null default now()
);

create table if not exists public.integrations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  provider text not null check (provider in ('facebook','telegram')),
  external_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  provider text not null check (provider in ('facebook','telegram')),
  sender text not null,
  content text not null,
  received_at timestamptz not null,
  raw_payload jsonb not null,
  shift text not null check (shift in ('day','night'))
);

alter table public.tenants enable row level security;
alter table public.integrations enable row level security;
alter table public.messages enable row level security;
