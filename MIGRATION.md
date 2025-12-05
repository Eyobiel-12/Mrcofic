# 🗄️ Database Migration - MARCOFIC

## Snelle Migratie (Aanbevolen)

### Optie 1: Via Supabase Dashboard (Makkelijkste)

1. **Open Supabase SQL Editor:**
   - Ga naar: https://supabase.com/dashboard/project/vxjviyzzonblhvbyulhb/sql/new

2. **Kopieer SQL code:**
   - Open het bestand: `database/schema.sql`
   - Kopieer alle SQL code

3. **Voer uit:**
   - Plak de SQL in de SQL Editor
   - Klik op **"Run"** of druk `Cmd+Enter`

4. **Verifieer:**
   - Ga naar **Table Editor**
   - Controleer dat de `appointments` tabel bestaat

## Alternatieve Methoden

### Optie 2: Via Supabase CLI

Als je ingelogd bent via CLI:

```bash
# Login (opent browser)
supabase login

# Link project
supabase link --project-ref vxjviyzzonblhvbyulhb

# Push migrations
supabase db push
```

### Optie 3: Via psql (Direct Database Connectie)

Als je je database wachtwoord hebt:

```bash
# Vervang [YOUR-PASSWORD] in .env.local met je wachtwoord
# Dan:
source .env.local
psql "$DATABASE_URL" -f database/schema.sql
```

### Optie 4: Via Access Token

1. Haal access token op:
   - https://supabase.com/dashboard/account/tokens
   - Maak nieuwe token aan

2. Export token:
```bash
export SUPABASE_ACCESS_TOKEN=your_token_here
./run-migration.sh
```

## ✅ Verificatie

Na migratie, controleer:

1. **Tabel bestaat:**
   ```sql
   SELECT * FROM appointments LIMIT 1;
   ```

2. **Indexes zijn aangemaakt:**
   ```sql
   SELECT indexname FROM pg_indexes WHERE tablename = 'appointments';
   ```

3. **Constraints zijn actief:**
   ```sql
   SELECT conname FROM pg_constraint WHERE conrelid = 'appointments'::regclass;
   ```

## 🆘 Problemen?

- **"relation already exists"** → Tabel bestaat al, dit is OK (IF NOT EXISTS voorkomt errors)
- **"permission denied"** → Check of je admin rechten hebt op het project
- **"extension uuid-ossp does not exist"** → Contact Supabase support

## 📋 Wat wordt aangemaakt?

- ✅ `appointments` tabel met alle kolommen
- ✅ Unique constraint op `(date, time)` - voorkomt dubbele boekingen
- ✅ Indexes voor snelle queries
- ✅ Check constraint voor status waarden
- ✅ UUID extension voor primary keys

