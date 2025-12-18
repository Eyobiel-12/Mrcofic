# 🚫 Migratie: Blocked Dates Tabel

## Snelle Migratie via Supabase Dashboard

### Stap 1: Open SQL Editor
Ga naar: **https://supabase.com/dashboard/project/vxjviyzzonblhvbyulhb/sql/new**

### Stap 2: Kopieer en Plak SQL

Kopieer de volgende SQL code:

```sql
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
```

### Stap 3: Voer Uit
- Plak de SQL in de SQL Editor
- Klik op **"Run"** of druk `Cmd+Enter` (Mac) / `Ctrl+Enter` (Windows)

### Stap 4: Verifieer
Ga naar **Table Editor** en controleer dat de `blocked_dates` tabel bestaat.

## ✅ Klaar!

Na deze migratie kun je:
- Datums blokkeren in het Admin Dashboard
- Geblokkeerde datums zien in de calendar (rood gemarkeerd)
- Geen boekingen maken op geblokkeerde datums

