# ✅ EmailJS Server-Side API Enable - Stap voor Stap

## Het Probleem
Error 403: "API calls are disabled for non-browser applications"

EmailJS blokkeert standaard server-side API calls voor beveiliging.

## Oplossing: Enable in EmailJS Dashboard

### Stap 1: Login EmailJS
1. Ga naar: https://www.emailjs.com/
2. Login met je account

### Stap 2: Ga naar Account Settings
1. Klik op je profiel/account naam (rechtsboven)
2. Klik op **"Account"** of **"Settings"**
3. Of ga direct naar: https://dashboard.emailjs.com/admin

### Stap 3: Enable Server-Side API
1. Zoek naar **"Security"** sectie
2. Zoek naar deze optie:
   - ✅ **"Allow EmailJS API for non-browser applications"**
   - ✅ **"Allow server-side API calls"**
   - ✅ **"Enable server-side access"**
3. **Zet deze optie AAN (enable)**
4. **Sla op**

### Stap 4: Private Key (Optioneel maar Aanbevolen)
Voor extra beveiliging:

1. In dezelfde **Security** sectie
2. Klik op **"Generate Private Key"** of **"API Keys"**
3. Kopieer de **Private Key** (niet de Public Key!)
4. Update `.env.local`:
   ```env
   EMAILJS_USER_ID=your_private_key_here
   ```
5. **Herstart dev server**

### Stap 5: Test Opnieuw
1. Herstart je dev server:
   ```bash
   # Stop (Ctrl+C)
   npm run dev
   ```

2. Test: http://localhost:3000/test-email
3. Check EmailJS Dashboard → Events voor logs

---

## 🎯 Waar precies te vinden?

**Exacte locatie:**
- **EmailJS Dashboard** → **Account** → **Security**
- Zoek naar: **"Allow EmailJS API for non-browser applications"**
- Toggle deze optie **AAN**

**Als je het niet vindt:**
- Check je plan (Free plan heeft mogelijk geen server-side access)
- Contact EmailJS support
- Of gebruik alternatieve email service

---

## 🔄 Alternatief: Test via EmailJS Dashboard Direct

Als server-side niet werkt, test eerst je templates direct:

1. Ga naar EmailJS Dashboard → Email Templates
2. Klik op een template
3. Klik op **"Test"** button
4. Vul test data in
5. Als dit werkt → templates zijn goed
6. Dan is het alleen een server-side access probleem

---

## ✅ Na Enable

Zodra je server-side API hebt enabled:
- ✅ Server-side calls werken
- ✅ Emails worden verzonden vanuit Next.js API routes
- ✅ Geen 403 errors meer
- ✅ Check EmailJS Events voor verzonden emails

---

## 🆘 Als optie niet beschikbaar is

**Mogelijke redenen:**
- Free plan heeft mogelijk geen server-side access
- Account niet volledig geactiveerd
- Oude EmailJS account versie

**Oplossingen:**
1. Upgrade naar paid plan
2. Contact EmailJS support
3. Gebruik alternatieve email service (Resend, SendGrid, etc.)
