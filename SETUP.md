# 🔧 Setup Instructies - MARCOFIC

## Stap 1: Supabase Credentials

Je hebt al de volgende credentials:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - ingesteld
- ✅ `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` - ingesteld (dit is je anon key)

### Nog nodig:

1. **Service Role Key** (voor server-side operaties):
   - Ga naar [Supabase Dashboard](https://supabase.com/dashboard)
   - Selecteer je project
   - Ga naar **Settings** → **API**
   - Kopieer de **`service_role` key** (niet de anon key!)
   - Plak deze in `.env.local` als `SUPABASE_SERVICE_ROLE_KEY`

2. **Database Wachtwoord** (voor DATABASE_URL):
   - Ga naar **Settings** → **Database**
   - Kopieer je database wachtwoord
   - Vervang `[YOUR-PASSWORD]` in `.env.local`

## Stap 2: Database Schema Uitvoeren

1. Ga naar Supabase Dashboard → **SQL Editor**
2. Open het bestand `database/schema.sql`
3. Kopieer de volledige SQL code
4. Plak in SQL Editor en klik **Run**

Dit maakt de `appointments` tabel aan met alle benodigde constraints.

## Stap 3: EmailJS Setup

1. Maak account op [EmailJS](https://www.emailjs.com/)
2. Configureer een email service (Gmail, SendGrid, etc.)
3. Maak 3 templates:

### Template 1: Admin Notify
- **Naam**: `admin_notify`
- **Variabelen**:
  - `{{to_email}}`
  - `{{name}}`
  - `{{email}}`
  - `{{phone}}`
  - `{{date}}`
  - `{{time}}`
  - `{{message}}`
  - `{{admin_link}}`

### Template 2: User Confirm
- **Naam**: `user_confirm`
- **Variabelen**:
  - `{{to_email}}`
  - `{{name}}`
  - `{{date}}`
  - `{{time}}`
  - `{{link}}`

### Template 3: User Reject
- **Naam**: `user_reject`
- **Variabelen**:
  - `{{to_email}}`
  - `{{name}}`
  - `{{date}}`
  - `{{time}}`

4. Kopieer de **Service ID**, **Template IDs** en **User ID** naar `.env.local`

## Stap 4: Environment Variables Controleren

Controleer dat `.env.local` alle volgende variabelen bevat:

```env
# Supabase (✅ al ingesteld)
NEXT_PUBLIC_SUPABASE_URL=https://vxjviyzzonblhvbyulhb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_rvLgcVTm-Kkoe4Jj1vgi2A_nI2LA1iX

# Supabase Service Role (⚠️ nog nodig)
SUPABASE_SERVICE_ROLE_KEY=...

# EmailJS (⚠️ nog nodig)
EMAILJS_SERVICE_ID=...
EMAILJS_TEMPLATE_ID_ADMIN=...
EMAILJS_TEMPLATE_ID_USER_CONFIRM=...
EMAILJS_TEMPLATE_ID_USER_REJECT=...
EMAILJS_USER_ID=...

# App Config (⚠️ aanpassen)
ADMIN_NOTIFICATION_EMAIL=admin@jouwdomein.nl
APP_BASE_URL=http://localhost:3000  # Voor productie: https://jouwdomein.nl
```

## Stap 5: Dependencies Installeren

```bash
npm install
```

## Stap 6: Development Server Starten

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✅ Test Checklist

- [ ] Database schema is uitgevoerd
- [ ] Service Role Key is ingesteld
- [ ] EmailJS templates zijn aangemaakt
- [ ] Development server draait zonder errors
- [ ] Boek een test afspraak
- [ ] Check Supabase database voor nieuwe appointment
- [ ] Admin ontvangt e-mail (check EmailJS logs)
- [ ] Test admin dashboard op `/admin`

## 🆘 Problemen?

### "Missing Supabase environment variables"
- Controleer dat `.env.local` bestaat en alle variabelen bevat
- Herstart de development server na het toevoegen van env vars

### Database errors
- Verifieer dat schema.sql is uitgevoerd
- Check Supabase Dashboard → Table Editor → `appointments` tabel bestaat

### EmailJS errors
- Check EmailJS dashboard voor template IDs
- Verifieer dat alle template variabelen correct zijn
- Check server logs voor specifieke errors

