create extension if not exists pgcrypto;

create table if not exists public.love_test_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  locale text not null default 'zh-TW',
  session_id text,
  answers jsonb not null,
  scores jsonb not null,
  primary_archetype text not null,
  secondary_archetype text,
  result_title text not null,
  result_summary text not null
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  guest_id text not null,
  test_session_id text not null,
  plan_id text not null check (plan_id in ('basic', 'deep')),
  amount integer not null,
  currency text not null default 'TWD',
  status text not null,
  stripe_session_id text unique
);

create table if not exists public.ai_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  guest_id text,
  test_session_id text not null,
  plan_id text not null check (plan_id in ('basic', 'deep')),
  payment_status text,
  stripe_session_id text,
  access_token text not null unique,
  mode text not null check (mode in ('mock', 'live')),
  model text,
  status text not null default 'completed',
  title text not null,
  summary text not null,
  content jsonb not null
);

create index if not exists ai_reports_access_token_idx on public.ai_reports(access_token);
create index if not exists ai_reports_test_session_plan_idx on public.ai_reports(test_session_id, plan_id);

alter table public.love_test_results enable row level security;
alter table public.payments enable row level security;
alter table public.ai_reports enable row level security;

create policy "Allow anonymous insert for MVP love test"
on public.love_test_results
for insert
to anon
with check (true);

create policy "No anonymous read of love test results"
on public.love_test_results
for select
to anon
using (false);

create policy "No anonymous read of payments"
on public.payments
for select
to anon
using (false);

create policy "No anonymous read of ai reports"
on public.ai_reports
for select
to anon
using (false);
