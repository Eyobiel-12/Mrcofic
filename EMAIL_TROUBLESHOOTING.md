# 🔍 Email Troubleshooting Guide

## Als je geen email ontvangt, check dit:

### 1. ✅ Environment Variables
Controleer dat je `.env.local` deze bevat:
```env
EMAILJS_SERVICE_ID=service_gz5pvjr
EMAILJS_TEMPLATE_ID_USER_CONFIRM=template_1yev2jo
EMAILJS_TEMPLATE_ID_USER_REJECT=template_e7fxcxv
EMAILJS_USER_ID=R8yTGMC45jk_aGGIx
```

**Belangrijk:** Herstart je dev server na het toevoegen/wijzigen van env vars!
```bash
# Stop de server (Ctrl+C) en start opnieuw:
npm run dev
```

### 2. 📧 Check EmailJS Dashboard
- Ga naar https://www.emailjs.com/dashboard
- Klik op **Email Logs** in het menu
- Check of er emails zijn verzonden
- Check of er errors zijn

### 3. 📬 Check Spam Folder
- Emails kunnen in spam terechtkomen
- Check ook "Promoties" tab in Gmail

### 4. 🔍 Check Browser Console
- Open http://localhost:3000/test-email
- Druk op F12 om Developer Tools te openen
- Ga naar "Console" tab
- Klik op "Test Bevestiging" of "Test Afwijzing"
- Check de error messages

### 5. 🖥️ Check Server Logs
- Kijk in je terminal waar `npm run dev` draait
- Je zou moeten zien:
  - `EmailJS Payload: {...}`
  - `EmailJS Response Status: 200` (of een error code)
  - `EmailJS Response: {...}`

### 6. ✅ Templates Bestaan in EmailJS?
- Ga naar EmailJS Dashboard → Email Templates
- Check of deze templates bestaan:
  - `template_1yev2jo` (Bevestiging)
  - `template_e7fxcxv` (Afwijzing)
- Check of de templates de juiste variabelen hebben:
  - `{{to_email}}`
  - `{{name}}`
  - `{{date}}`
  - `{{time}}`
  - `{{link}}` (alleen voor bevestiging)

### 7. 🔑 Check Service Configuration
- Ga naar EmailJS Dashboard → Email Services
- Check of `service_gz5pvjr` (Gmail) actief is
- Check of de service correct is geconfigureerd

### 8. 🧪 Test Direct in EmailJS
- Ga naar EmailJS Dashboard → Email Templates
- Klik op een template
- Klik op "Test" button
- Vul test data in en test direct
- Als dit werkt, is het probleem in de code/configuratie
- Als dit niet werkt, is het probleem in EmailJS zelf

### 9. 📋 Veelvoorkomende Errors

**Error: "Template not found"**
- Template ID klopt niet
- Template bestaat niet in EmailJS
- Check template ID in EmailJS dashboard

**Error: "Service not found"**
- Service ID klopt niet
- Service is niet actief
- Check service ID in EmailJS dashboard

**Error: "Invalid user_id"**
- User ID (Public Key) klopt niet
- Check API Keys in EmailJS dashboard

**Error: "Template variables missing"**
- Template heeft niet alle benodigde variabelen
- Check template in EmailJS en voeg variabelen toe

**Status 200 maar geen email:**
- Check spam folder
- Check EmailJS logs
- Check of "To Email" correct is ingesteld in template

### 10. 🛠️ Debug Steps

1. **Test de API direct:**
   ```bash
   curl -X POST https://api.emailjs.com/api/v1.0/email/send \
     -H "Content-Type: application/json" \
     -d '{
       "service_id": "service_gz5pvjr",
       "template_id": "template_1yev2jo",
       "user_id": "R8yTGMC45jk_aGGIx",
       "template_params": {
         "to_email": "jouw@email.com",
         "name": "Test",
         "date": "2025-12-15",
         "time": "10:00-10:30",
         "link": "http://localhost:3000"
       }
     }'
   ```

2. **Check EmailJS Response:**
   - Als status 200: email is verzonden, check inbox/spam
   - Als status 400/500: check error message in response

3. **Check Template Variables:**
   - Zorg dat variabele namen exact overeenkomen
   - Hoofdlettergevoelig!
   - Moeten tussen `{{}}` staan

### 11. ✅ Quick Checklist

- [ ] `.env.local` bestaat en heeft alle EMAILJS vars
- [ ] Dev server is herstart na env var wijzigingen
- [ ] Templates bestaan in EmailJS met juiste IDs
- [ ] Templates hebben alle benodigde variabelen
- [ ] Service is actief in EmailJS
- [ ] Test pagina toont geen errors in console
- [ ] Server logs tonen geen errors
- [ ] EmailJS logs tonen verzonden emails
- [ ] Spam folder is gecheckt

### 12. 🆘 Nog steeds problemen?

1. Check EmailJS dashboard → Email Logs voor details
2. Check server terminal voor error logs
3. Check browser console voor client-side errors
4. Test template direct in EmailJS dashboard
5. Verifieer alle IDs opnieuw in EmailJS dashboard

