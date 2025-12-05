-- MARCOFIC Database Schema
-- Voer dit script uit in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create appointments table
create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  date date not null,
  time text not null, -- format: "11:00-11:30"
  status text not null default 'pending', -- pending, approved, rejected
  message text,
  created_at timestamptz default now()
);

-- Unieke constraint: voorkomt gelijktijdige inserts met exact dezelfde date+time
-- Dit is de primaire verdediging tegen race conditions
create unique index if not exists appointments_date_time_idx on appointments (date, time);

-- Indexes voor performante queries
create index if not exists idx_appointments_status on appointments (status);
create index if not exists idx_appointments_date on appointments (date);
create index if not exists idx_appointments_created_at on appointments (created_at);

-- Optional: Add check constraint for status values
alter table appointments add constraint check_status 
  check (status in ('pending', 'approved', 'rejected'));

-- Optional: Add email validation (basic)
-- alter table appointments add constraint check_email 
--   check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Comments for documentation
comment on table appointments is 'Stores all appointment bookings';
comment on column appointments.status is 'pending: waiting for admin approval, approved: confirmed by admin, rejected: declined by admin';
comment on column appointments.time is 'Time slot in format HH:MM-HH:MM (e.g., 11:00-11:30)';

