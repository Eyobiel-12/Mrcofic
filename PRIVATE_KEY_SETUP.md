# 🔑 EmailJS Private Key Setup

## ✅ Private Key Toegevoegd

Je private key is nu toegevoegd aan `.env.local`:
```
EMAILJS_USER_ID=tq4mxKyJVkUWDGoh-0vkg
```

## 🔄 Volgende Stappen

### 1. Herstart Dev Server
**BELANGRIJK:** Herstart je dev server zodat de nieuwe env var wordt geladen:

```bash
# Stop de server (Ctrl+C)
npm run dev
```

### 2. Test Opnieuw
1. Ga naar: http://localhost:3000/test-email
2. Vul je email in
3. Klik op "Test Bevestiging" of "Test Afwijzing"
4. Check of het nu werkt!

### 3. Check EmailJS Dashboard
- Ga naar EmailJS Dashboard → Events
- Je zou nu emails moeten zien die succesvol zijn verzonden

---

## ⚠️ Belangrijk: Private Key Beveiliging

- ✅ **Private Key is gevoelig** - nooit in client-side code!
- ✅ Alleen gebruiken in server-side API routes (zoals nu)
- ✅ **Nooit committen** naar Git (staat al in `.gitignore`)
- ✅ Alleen delen met vertrouwde developers

---

## 🆘 Als het nog steeds niet werkt

### Check 1: EmailJS Dashboard Settings
1. Ga naar EmailJS Dashboard → Account → Security
2. Check of deze opties aan staan:
   - ✅ "Allow EmailJS API for non-browser applications"
   - ✅ "Allow private key usage" (als beschikbaar)

### Check 2: Private Key Format
- Private key moet exact zijn zoals je het hebt gekopieerd
- Geen extra spaties of newlines
- Check `.env.local` of de key correct is

### Check 3: Server Logs
- Check terminal waar `npm run dev` draait
- Je zou moeten zien: `EmailJS Payload: {...}`
- Check of `user_id` de private key bevat (niet de public key)

### Check 4: EmailJS Plan
- Sommige features zijn alleen beschikbaar op paid plans
- Check Account → Billing voor je plan

---

## ✅ Success Indicators

Als alles werkt, zie je:
- ✅ Status 200 in browser console
- ✅ "Email sent successfully" message
- ✅ Email in je inbox (check spam folder)
- ✅ EmailJS Dashboard → Events toont verzonden email

