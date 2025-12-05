# 🔧 EmailJS Server-Side API Fix

## Probleem
Error 403: "API calls are disabled for non-browser applications"

Dit betekent dat EmailJS server-side API calls blokkeert. Dit is een beveiligingsmaatregel.

## Oplossing

### Optie 1: Enable Server-Side API in EmailJS (Aanbevolen)

1. **Ga naar EmailJS Dashboard:**
   - Login op https://www.emailjs.com/
   - Ga naar **Account** → **General Settings**

2. **Enable Server-Side API:**
   - Zoek naar "Allow server-side API calls" of "Enable server-side access"
   - Zet dit aan (enable)
   - Sla op

3. **Check je Plan:**
   - Sommige EmailJS plannen hebben server-side API calls disabled
   - Free plan: mogelijk beperkt
   - Paid plan: meestal wel toegestaan
   - Check je plan in Account → Billing

### Optie 2: Use Private Key (Als beschikbaar)

Als je een Private Key hebt (niet de Public Key):

1. **Ga naar EmailJS Dashboard:**
   - Account → API Keys
   - Kopieer de **Private Key** (niet de Public Key!)

2. **Update `.env.local`:**
   ```env
   # Gebruik Private Key voor server-side
   EMAILJS_USER_ID=your_private_key_here
   ```

3. **Belangrijk:**
   - Private Key is gevoelig - nooit in client-side code!
   - Alleen gebruiken in server-side API routes
   - Public Key blijft voor client-side

### Optie 3: Test via Client-Side (Tijdelijk)

Voor testing kun je tijdelijk client-side testen:

1. Maak een test component die EmailJS direct aanroept
2. Dit werkt alleen voor testing, niet voor productie
3. Gebruik dit alleen om te verifiëren dat templates werken

### Optie 4: Upgrade EmailJS Plan

Als server-side API calls niet beschikbaar zijn op je plan:

1. Overweeg een upgrade naar een paid plan
2. Of gebruik een alternatieve email service (SendGrid, Resend, etc.)

---

## ✅ Quick Fix Checklist

- [ ] Check EmailJS Dashboard → Account → General Settings
- [ ] Enable "Allow server-side API calls" (als beschikbaar)
- [ ] Check je EmailJS plan (Free/Paid)
- [ ] Probeer Private Key in plaats van Public Key
- [ ] Test opnieuw na wijzigingen
- [ ] Herstart dev server na env var wijzigingen

---

## 🆘 Als server-side niet beschikbaar is

**Alternatief: Gebruik een andere email service**

Voor server-side email in productie, overweeg:
- **Resend** (modern, developer-friendly)
- **SendGrid** (betrouwbaar, veel features)
- **AWS SES** (goedkoop, schaalbaar)
- **Postmark** (transactional emails)

Deze services zijn specifiek gemaakt voor server-side email sending.

---

## 📝 Test na Fix

1. Herstart dev server:
   ```bash
   npm run dev
   ```

2. Test via: http://localhost:3000/test-email
3. Check terminal voor logs
4. Check EmailJS Dashboard → Events

Als je nog steeds 403 krijgt, betekent dit dat server-side API calls niet beschikbaar zijn op je plan.

