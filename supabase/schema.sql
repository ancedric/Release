create table public.requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  first_name text not null, last_name text not null, phone text not null, address text,
  service text not null, service_option text, delivery_method text not null,
  payment_method text, payment_status text default 'pending', total numeric,
  file_urls text[] default '{}', status text default 'new'
);
alter table public.requests enable row level security;
create policy "Public can create requests" on public.requests for insert to anon with check (true);
create policy "Admins can manage requests" on public.requests for all to authenticated using ((auth.jwt() ->> 'role') = 'admin');
