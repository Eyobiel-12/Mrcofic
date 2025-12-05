# 🚀 Vercel Deployment Guide - MARCOFIC

## Environment Variables voor Vercel

Voeg deze environment variables toe in **Vercel Dashboard → Project Settings → Environment Variables**:

### ✅ Verplichte Variabelen

#### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://vxjviyzzonblhvbyulhb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_rvLgcVTm-Kkoe4Jj1vgi2A_nI2LA1iX
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4anZpeXp6b25ibGh2Ynl1bGhiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDkzOTczOCwiZXhwIjoyMDgwNTE1NzM4fQ.ceX3hPUEKkffxltj5TAbprtV8dNjqhh9niPDsa2hpRQ
```

#### EmailJS Configuration
```
EMAILJS_SERVICE_ID=service_gz5pvjr
EMAILJS_TEMPLATE_ID_USER_CONFIRM=template_1yev2jo
EMAILJS_TEMPLATE_ID_USER_REJECT=template_e7fxcxv
EMAILJS_USER_ID=R8yTGMC45jk_aGGIx
EMAILJS_PRIVATE_KEY=tq4mxKyJVkUWDGoh-0vkg
```

#### App Configuration
```
ADMIN_PASSWORD=your_secure_password_here
APP_BASE_URL=https://your-vercel-app.vercel.app
```

### ⚠️ Optionele Variabelen

```
EMAILJS_TEMPLATE_ID_ADMIN=your_admin_template_id
ADMIN_NOTIFICATION_EMAIL=admin@domain.com
DATABASE_URL=postgresql://postgres.vxjviyzzonblhvbyulhb:[YOUR-PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

## 📋 Stap-voor-stap Deployment

### 1. Push naar GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import Project in Vercel
1. Ga naar [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik op **"Add New Project"**
3. Import je GitHub repository
4. Selecteer de `main` branch

### 3. Configureer Environment Variables
1. In het project setup scherm, klik op **"Environment Variables"**
2. Voeg alle variabelen hierboven toe
3. **Belangrijk**: Zet `APP_BASE_URL` naar je Vercel URL (bijv. `https://marcofic.vercel.app`)

### 4. Deploy!
1. Klik op **"Deploy"**
2. Wacht tot de build klaar is
3. Check de build logs voor errors

## 🔍 Post-Deployment Checklist

- [ ] Build is succesvol
- [ ] Website is bereikbaar op Vercel URL
- [ ] Test een afspraak boeken
- [ ] Check Supabase database voor nieuwe appointment
- [ ] Test admin dashboard login
- [ ] Test approve/reject functionaliteit
- [ ] Check of emails worden verstuurd (EmailJS logs)

## 🐛 Troubleshooting

### Build Fails
- Check alle environment variables zijn ingesteld
- Check build logs voor specifieke errors
- Zorg dat `EMAILJS_PRIVATE_KEY` is ingesteld (niet alleen `EMAILJS_USER_ID`)

### Emails werken niet
- Check EmailJS Dashboard → Account → Security → "Allow EmailJS API for non-browser applications" is enabled
- Verifieer dat `EMAILJS_PRIVATE_KEY` correct is ingesteld
- Check EmailJS logs voor errors

### Database errors
- Verifieer `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check Supabase Dashboard → Settings → API → service_role key
- Zorg dat database schema is uitgevoerd

### Admin login werkt niet
- Check `ADMIN_PASSWORD` is correct ingesteld in Vercel
- Verifieer dat password overeenkomt met wat je gebruikt

## 📝 Belangrijke Notities

1. **APP_BASE_URL**: Update deze naar je productie URL na eerste deployment
2. **EMAILJS_PRIVATE_KEY**: Deze is nodig voor server-side API calls
3. **SUPABASE_SERVICE_ROLE_KEY**: Deze is nodig voor server-side database operaties
4. Alle `NEXT_PUBLIC_*` variabelen zijn zichtbaar in de browser, gebruik geen secrets hier

## 🔐 Security Best Practices

- Gebruik sterke wachtwoorden voor `ADMIN_PASSWORD`
- Laat `EMAILJS_PRIVATE_KEY` nooit in code staan
- Gebruik Vercel's environment variables, niet `.env.local` in productie
- Check regelmatig EmailJS logs voor verdachte activiteit

