# 🔧 EmailJS Template "To Email" Fix

## Probleem
Error 422: "The recipients address is empty"

Dit betekent dat de EmailJS template het `to_email` adres niet ontvangt.

## Oplossing: Fix Template "To Email" Field

### Stap 1: Ga naar EmailJS Dashboard
1. Login op https://www.emailjs.com/
2. Ga naar **Email Templates**

### Stap 2: Open Beide Templates

**Template 1: Bevestiging (`template_1yev2jo`)**
1. Klik op de template "Afspraak BEVSTIG" of template ID `template_1yev2jo`
2. Scroll naar **"To Email"** field
3. **BELANGRIJK:** Dit veld MOET bevatten: `{{to_email}}`
   - ❌ NIET: `to_email` (zonder {{}})
   - ❌ NIET: een hardcoded email zoals `test@example.com`
   - ✅ WEL: `{{to_email}}` (met dubbele accolades)

**Template 2: Afwijzing (`template_e7fxcxv`)**
1. Klik op de template "Afspraak kon niet bevestigd worden" of template ID `template_e7fxcxv`
2. Scroll naar **"To Email"** field
3. **BELANGRIJK:** Dit veld MOET bevatten: `{{to_email}}`
   - ❌ NIET: `to_email` (zonder {{}})
   - ❌ NIET: een hardcoded email
   - ✅ WEL: `{{to_email}}` (met dubbele accolades)

### Stap 3: Sla Op
1. Klik op **"Save"** of **"Update"** voor beide templates
2. Wacht even tot EmailJS de templates heeft opgeslagen

### Stap 4: Test Direct in EmailJS (Optioneel)
1. In de template, klik op **"Test"** button
2. Vul in:
   - `to_email`: jouw@email.com
   - `name`: Test Naam
   - `date`: 2025-12-15
   - `time`: 10:00-10:30
3. Klik "Send Test Email"
4. Als dit werkt → template is goed geconfigureerd

### Stap 5: Test Opnieuw in App
1. Ga naar: http://localhost:3000/test-email
2. Vul je email in
3. Klik op "Test Bevestiging" of "Test Afwijzing"
4. Het zou nu moeten werken!

---

## 📋 Checklist

Voor **BEIDE** templates (`template_1yev2jo` en `template_e7fxcxv`):

- [ ] "To Email" field bevat `{{to_email}}` (met {{}})
- [ ] "From Name" is ingesteld (bijv. "MARCOFIC")
- [ ] "From Email" is ingesteld (je Gmail adres)
- [ ] Template is opgeslagen
- [ ] Test in EmailJS Dashboard werkt
- [ ] Test in app werkt

---

## 🎯 Exact Format

**"To Email" field moet zijn:**
```
{{to_email}}
```

**NIET:**
- `to_email` (zonder accolades)
- `{{ to_email }}` (met spaties)
- `{{to_email}} ` (met spatie aan einde)
- Een hardcoded email

---

## ✅ Na Fix

Als je `{{to_email}}` correct hebt ingesteld:
- ✅ Emails worden verzonden naar het juiste adres
- ✅ Geen "recipients address is empty" error meer
- ✅ Status 200 in plaats van 422
- ✅ Email komt aan in inbox

