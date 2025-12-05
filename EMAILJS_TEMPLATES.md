# 📧 EmailJS Templates Setup Guide

## Template 1: Bevestigingsmail (Confirmation) - `template_1yev2jo`

**Template Naam:** Afspraak BEVSTIG

**Variabelen die gebruikt worden:**
- `{{to_email}}` - E-mailadres van de klant
- `{{name}}` - Naam van de klant
- `{{date}}` - Datum van de afspraak (format: YYYY-MM-DD)
- `{{time}}` - Tijd van de afspraak (format: HH:MM-HH:MM)
- `{{link}}` - Link naar de website

**Voorbeeld Template Content:**
```
Onderwerp: Afspraak Bevestigd - MARCOFIC

Beste {{name}},

Uw afspraak is bevestigd!

📅 Datum: {{date}}
🕐 Tijd: {{time}}

We zien u graag op het bovenstaande tijdstip.

Met vriendelijke groet,
MARCOFIC Professional Boekhouding

{{link}}
```

---

## Template 2: Afwijzingsmail (Rejection) - `template_e7fxcxv`

**Template Naam:** Afspraak kon niet bevestigd worden

**Variabelen die gebruikt worden:**
- `{{to_email}}` - E-mailadres van de klant
- `{{name}}` - Naam van de klant
- `{{date}}` - Datum van de afspraak (format: YYYY-MM-DD)
- `{{time}}` - Tijd van de afspraak (format: HH:MM-HH:MM)

**Voorbeeld Template Content:**
```
Onderwerp: Afspraak Geannuleerd - MARCOFIC

Beste {{name}},

Helaas kunnen we uw afspraak niet bevestigen.

📅 Datum: {{date}}
🕐 Tijd: {{time}}

Deze tijd is helaas niet meer beschikbaar. 
Gelieve een nieuwe afspraak te maken via onze website.

Met vriendelijke groet,
MARCOFIC Professional Boekhouding
```

---

## 📝 Stappen om Templates te Maken in EmailJS

1. **Ga naar EmailJS Dashboard:**
   - Login op [https://www.emailjs.com/](https://www.emailjs.com/)
   - Ga naar **Email Templates**

2. **Voor Bevestigingsmail:**
   - Klik op **Create New Template**
   - Template Naam: `Afspraak BEVSTIG`
   - Voeg de variabelen toe: `{{to_email}}`, `{{name}}`, `{{date}}`, `{{time}}`, `{{link}}`
   - Kopieer de **Template ID** (zou `template_1yev2jo` moeten zijn)

3. **Voor Afwijzingsmail:**
   - Klik op **Create New Template**
   - Template Naam: `Afspraak kon niet bevestigd worden`
   - Voeg de variabelen toe: `{{to_email}}`, `{{name}}`, `{{date}}`, `{{time}}`
   - Kopieer de **Template ID** (zou `template_e7fxcxv` moeten zijn)

4. **Belangrijk:**
   - Zorg dat de variabele namen **exact** overeenkomen (hoofdlettergevoelig!)
   - Test de templates eerst in EmailJS voordat je ze gebruikt
   - Check dat de Service ID correct is ingesteld (`service_gz5pvjr`)

---

## ✅ Checklist

- [ ] Bevestigingsmail template aangemaakt met ID: `template_1yev2jo`
- [ ] Afwijzingsmail template aangemaakt met ID: `template_e7fxcxv`
- [ ] Alle variabelen zijn correct toegevoegd aan de templates
- [ ] Templates zijn getest in EmailJS dashboard
- [ ] `.env.local` bevat alle juiste template IDs

---

## 🧪 Test de Templates

Gebruik de test pagina: http://localhost:3000/test-email

1. Voer je e-mailadres in
2. Klik op "Test Bevestiging" - je zou de bevestigingsmail moeten ontvangen
3. Klik op "Test Afwijzing" - je zou de afwijzingsmail moeten ontvangen

---

## ⚠️ Veelvoorkomende Problemen

**Email komt niet aan:**
- Check spam folder
- Verifieer dat Service ID correct is
- Check EmailJS logs in dashboard

**Variabelen worden niet ingevuld:**
- Controleer dat variabele namen exact overeenkomen (hoofdlettergevoelig!)
- Check dat variabelen tussen `{{}}` staan in de template

**Template ID klopt niet:**
- Kopieer de Template ID opnieuw uit EmailJS dashboard
- Check dat het de juiste template is (niet de admin template)

