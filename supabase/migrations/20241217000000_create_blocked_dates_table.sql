-- Create blocked_dates table for admin date management
create table if not exists blocked_dates (
  id uuid primary key default uuid_generate_v4(),
  date date not null unique,
  reason text,
  created_at timestamptz default now(),
  created_by text default 'admin'
);

-- Index for fast date lookups
create index if not exists idx_blocked_dates_date on blocked_dates (date);

-- Comment for documentation
comment on table blocked_dates is 'Stores dates that are blocked from bookings by admin';
comment on column blocked_dates.reason is 'Optional reason for blocking the date';

