# 📧 EmailJS Templates - Exacte Content

Kopieer en plak deze content direct in je EmailJS templates.

---

## Template 1: Bevestigingsmail (Confirmation)

**Template ID:** `template_1yev2jo`  
**Template Naam:** Afspraak BEVSTIG

### Onderwerp (Subject):
```
Afspraak Bevestigd - MARCOFIC
```

### Content (Body):
```
Beste {{name}},

Uw afspraak is bevestigd! ✅

📅 Datum: {{date}}
🕐 Tijd: {{time}}

We zien u graag op het bovenstaande tijdstip.

Met vriendelijke groet,
MARCOFIC Professional Boekhouding

---
Bezoek onze website: {{link}}
```

### HTML Versie (als je HTML gebruikt):
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border: 1px solid #e5e7eb;
    }
    .info-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #3b82f6;
    }
    .footer {
      background: #1f2937;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 0 0 10px 10px;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      background: #3b82f6;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Afspraak Bevestigd ✅</h1>
  </div>
  <div class="content">
    <p>Beste <strong>{{name}}</strong>,</p>
    
    <p>Uw afspraak is bevestigd!</p>
    
    <div class="info-box">
      <p><strong>📅 Datum:</strong> {{date}}</p>
      <p><strong>🕐 Tijd:</strong> {{time}}</p>
    </div>
    
    <p>We zien u graag op het bovenstaande tijdstip.</p>
    
    <p>Met vriendelijke groet,<br>
    <strong>MARCOFIC Professional Boekhouding</strong></p>
    
    <a href="{{link}}" class="button">Bezoek Onze Website</a>
  </div>
  <div class="footer">
    <p>MARCOFIC - Professional Boekhouding</p>
  </div>
</body>
</html>
```

---

## Template 2: Afwijzingsmail (Rejection)

**Template ID:** `template_e7fxcxv`  
**Template Naam:** Afspraak kon niet bevestigd worden

### Onderwerp (Subject):
```
Afspraak Geannuleerd - MARCOFIC
```

### Content (Body):
```
Beste {{name}},

Helaas kunnen we uw afspraak niet bevestigen. ❌

📅 Datum: {{date}}
🕐 Tijd: {{time}}

Deze tijd is helaas niet meer beschikbaar. 
Gelieve een nieuwe afspraak te maken via onze website.

Met vriendelijke groet,
MARCOFIC Professional Boekhouding
```

### HTML Versie (als je HTML gebruikt):
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border: 1px solid #e5e7eb;
    }
    .info-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #dc2626;
    }
    .footer {
      background: #1f2937;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 0 0 10px 10px;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      background: #3b82f6;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Afspraak Geannuleerd ❌</h1>
  </div>
  <div class="content">
    <p>Beste <strong>{{name}}</strong>,</p>
    
    <p>Helaas kunnen we uw afspraak niet bevestigen.</p>
    
    <div class="info-box">
      <p><strong>📅 Datum:</strong> {{date}}</p>
      <p><strong>🕐 Tijd:</strong> {{time}}</p>
    </div>
    
    <p>Deze tijd is helaas niet meer beschikbaar. Gelieve een nieuwe afspraak te maken via onze website.</p>
    
    <p>Met vriendelijke groet,<br>
    <strong>MARCOFIC Professional Boekhouding</strong></p>
  </div>
  <div class="footer">
    <p>MARCOFIC - Professional Boekhouding</p>
  </div>
</body>
</html>
```

---

## 📝 Stappen om Templates in EmailJS te Maken:

1. **Ga naar EmailJS Dashboard:**
   - Login: https://www.emailjs.com/
   - Klik op **Email Templates** in het menu

2. **Voor Bevestigingsmail:**
   - Klik op **Create New Template** of bewerk bestaande template
   - **Template Name:** `Afspraak BEVSTIG`
   - **Subject:** Kopieer de onderwerp regel hierboven
   - **Content:** Kopieer de body content (of HTML versie)
   - **To Email:** `{{to_email}}`
   - **From Name:** `MARCOFIC`
   - **From Email:** (je Gmail adres)
   - Sla op en kopieer de **Template ID** (zou `template_1yev2jo` moeten zijn)

3. **Voor Afwijzingsmail:**
   - Klik op **Create New Template** of bewerk bestaande template
   - **Template Name:** `Afspraak kon niet bevestigd worden`
   - **Subject:** Kopieer de onderwerp regel hierboven
   - **Content:** Kopieer de body content (of HTML versie)
   - **To Email:** `{{to_email}}`
   - **From Name:** `MARCOFIC`
   - **From Email:** (je Gmail adres)
   - Sla op en kopieer de **Template ID** (zou `template_e7fxcxv` moeten zijn)

4. **Belangrijk - Variabelen:**
   Zorg dat deze variabelen in je template staan:
   - `{{to_email}}` - wordt automatisch ingevuld
   - `{{name}}` - naam van de klant
   - `{{date}}` - datum van afspraak
   - `{{time}}` - tijd van afspraak
   - `{{link}}` - alleen voor bevestigingsmail

---

## ✅ Test Checklist:

- [ ] Beide templates zijn aangemaakt in EmailJS
- [ ] Template IDs zijn correct (`template_1yev2jo` en `template_e7fxcxv`)
- [ ] Alle variabelen zijn toegevoegd
- [ ] `.env.local` bevat alle juiste IDs
- [ ] Test via http://localhost:3000/test-email

