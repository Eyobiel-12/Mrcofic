# 🚀 Quick Start Guide - MARCOFIC

## Snelle Setup (5 minuten)

### Stap 1: Dependencies installeren
```bash
npm install
```

### Stap 2: Environment Variables
Kopieer `.env.example` naar `.env.local` en vul in:
- Supabase URL & keys
- EmailJS configuratie
- Admin e-mail adres

### Stap 3: Database Setup
1. Ga naar Supabase Dashboard → SQL Editor
2. Kopieer en voer uit: `database/schema.sql`

### Stap 4: EmailJS Templates
Maak 3 templates in EmailJS:
1. **Admin Notify** - Template voor admin notificaties
2. **User Confirm** - Template voor bevestigingsmail
3. **User Reject** - Template voor afwijzingsmail

### Stap 5: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✅ Test Checklist

- [ ] Boek een afspraak → Check Supabase database
- [ ] Admin ontvangt e-mail notificatie
- [ ] Admin approve → Klant ontvangt bevestiging
- [ ] Probeer dubbele boeking → Krijg 409 error
- [ ] Admin reject → Slot wordt weer vrij

## 🚢 Deploy naar Vercel

1. Push naar GitHub
2. Import in Vercel
3. Voeg environment variables toe in Vercel Secrets
4. Deploy!

## 📧 EmailJS Template Variables

### Admin Notify Template
- `{{to_email}}` - Admin e-mail
- `{{name}}` - Klant naam
- `{{email}}` - Klant e-mail
- `{{phone}}` - Klant telefoon
- `{{date}}` - Afspraak datum
- `{{time}}` - Afspraak tijd
- `{{message}}` - Bericht van klant
- `{{admin_link}}` - Link naar admin dashboard

### User Confirm Template
- `{{to_email}}` - Klant e-mail
- `{{name}}` - Klant naam
- `{{date}}` - Afspraak datum
- `{{time}}` - Afspraak tijd
- `{{link}}` - Link naar website

### User Reject Template
- `{{to_email}}` - Klant e-mail
- `{{name}}` - Klant naam
- `{{date}}` - Afspraak datum
- `{{time}}` - Afspraak tijd

## 🆘 Problemen?

- **Database errors**: Check Supabase connection & schema
- **Email errors**: Verifieer EmailJS template IDs en service config
- **Build errors**: Check alle environment variables zijn ingesteld

