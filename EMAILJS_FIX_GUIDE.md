# 🔧 EmailJS Fix Guide - "The recipients address is empty"

## Probleem
Error 422: "The recipients address is empty" betekent dat EmailJS de `to_email` niet kan vinden.

## Oplossing

### Stap 1: Check EmailJS Template Configuratie

Voor **BEIDE** templates (`template_1yev2jo` en `template_e7fxcxv`):

1. Ga naar EmailJS Dashboard → Email Templates
2. Open de template
3. **BELANGRIJK:** In het "To Email" veld moet staan: `{{to_email}}`
   - NIET: `to_email` (zonder {{}})
   - NIET: een hardcoded email
   - WEL: `{{to_email}}` (met dubbele accolades)

4. Check ook:
   - **From Name:** `MARCOFIC` (of wat je wilt)
   - **From Email:** Je Gmail adres (of gebruik `{{reply_to}}`)

### Stap 2: Fix Gmail Service Authentication

Error 412 betekent dat Gmail service niet de juiste permissions heeft:

1. Ga naar EmailJS Dashboard → Email Services
2. Klik op je Gmail service (`service_gz5pvjr`)
3. Klik op "Reconnect" of "Authorize"
4. Geef alle benodigde permissions:
   - ✅ Send email
   - ✅ Read email (indien nodig)
5. Sla op

### Stap 3: Test Template Direct in EmailJS

1. Ga naar Email Templates
2. Klik op een template
3. Klik op "Test" button
4. Vul in:
   - `to_email`: jouw@email.com
   - `name`: Test Naam
   - `date`: 2025-12-15
   - `time`: 10:00-10:30
   - `link`: http://localhost:3000 (alleen voor bevestiging)
5. Klik "Send Test Email"
6. Als dit werkt → template is goed geconfigureerd
7. Als dit niet werkt → check Gmail service permissions

### Stap 4: Check Template Variables

Zorg dat deze variabelen in je template content staan:
- `{{to_email}}` - in "To Email" field
- `{{name}}` - in de email body
- `{{date}}` - in de email body
- `{{time}}` - in de email body
- `{{link}}` - alleen voor bevestiging template

### Stap 5: Test Opnieuw

1. Herstart je dev server:
   ```bash
   # Stop (Ctrl+C) en start opnieuw:
   npm run dev
   ```

2. Test via: http://localhost:3000/test-email
3. Check terminal logs voor details
4. Check EmailJS Dashboard → Events voor nieuwe logs

---

## ✅ Checklist

- [ ] Template "To Email" field bevat `{{to_email}}`
- [ ] Gmail service is opnieuw geautoriseerd
- [ ] Template test werkt in EmailJS dashboard
- [ ] Dev server is herstart
- [ ] Test email pagina werkt zonder errors
- [ ] EmailJS Events toont succesvolle verzending (status 200)

---

## 🆘 Nog steeds problemen?

**Als "The recipients address is empty" blijft:**

1. Check dat `{{to_email}}` exact zo staat (hoofdlettergevoelig!)
2. Check dat het in het "To Email" veld staat, niet in de body
3. Test template direct in EmailJS dashboard
4. Check EmailJS Events logs voor exacte error

**Als Gmail authentication error blijft:**

1. Disconnect Gmail service volledig
2. Reconnect met alle permissions
3. Check dat je Gmail account actief is
4. Probeer een andere email service (SendGrid, etc.) als test

