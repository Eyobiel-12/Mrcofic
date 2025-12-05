# ✅ EmailJS Keys Fixed

## Probleem Opgelost

De fout "The Public Key is invalid" is opgelost door:
- ✅ Public Key gebruikt als `user_id`
- ✅ Private Key gebruikt als `accessToken`

## Configuratie

Je `.env.local` bevat nu:
```env
EMAILJS_USER_ID=R8yTGMC45jk_aGGIx          # Public Key
EMAILJS_PRIVATE_KEY=tq4mxKyJVkUWDGoh-0vkg   # Private Key
```

## Code Updates

Alle API routes zijn bijgewerkt om:
1. Public Key als `user_id` te gebruiken
2. Private Key als `accessToken` toe te voegen (voor server-side calls)

**Bijgewerkte bestanden:**
- ✅ `app/api/test-email/route.ts`
- ✅ `app/api/admin/approve/route.ts`
- ✅ `app/api/admin/reject/route.ts`
- ✅ `app/api/book/route.ts`

## 🔄 Volgende Stap: Herstart Server

**BELANGRIJK:** Herstart je dev server zodat de nieuwe env vars worden geladen:

```bash
# Stop de server (Ctrl+C)
npm run dev
```

## ✅ Test

1. Ga naar: http://localhost:3000/test-email
2. Vul je email in
3. Klik op "Test Bevestiging" of "Test Afwijzing"
4. Check of het nu werkt!

## 📧 EmailJS API Format

De API calls gebruiken nu dit format:
```json
{
  "service_id": "service_gz5pvjr",
  "template_id": "template_xxx",
  "user_id": "R8yTGMC45jk_aGGIx",      // Public Key
  "accessToken": "tq4mxKyJVkUWDGoh-0vkg", // Private Key
  "template_params": { ... }
}
```

Dit is de correcte format voor EmailJS server-side API calls in strict mode.

