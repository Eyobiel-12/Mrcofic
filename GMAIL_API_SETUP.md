# 📧 Gmail API Setup Guide

## Overzicht

Gmail API kan gebruikt worden om emails te versturen zonder domain verificatie. Dit is een alternatief voor Resend.

## ⚠️ Belangrijk: Service Account Limitaties

**Service accounts kunnen NIET direct emails versturen namens een gebruiker.** Je hebt twee opties:

### Optie 1: Domain-Wide Delegation (Google Workspace)
Als je een Google Workspace account hebt, kun je domain-wide delegation instellen.

### Optie 2: OAuth2 (Aanbevolen voor Gmail)
Voor persoonlijke Gmail accounts, gebruik OAuth2 in plaats van service accounts.

## Stap 1: Download Service Account Key

1. **Ga naar Google Cloud Console:**
   - https://console.cloud.google.com/iam-admin/serviceaccounts
   - Selecteer je project "Marcofic"

2. **Download de Service Account Key:**
   - Klik op je service account "Marcofic"
   - Ga naar tab "Keys"
   - Klik op "Add Key" → "Create new key"
   - Kies "JSON" format
   - Download het bestand

3. **Voeg toe aan Environment Variables:**
   
   **Voor lokaal (.env.local):**
   ```env
   GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"marcofic@calm-aegis-459300-p4.iam.gserviceaccount.com",...}'
   GMAIL_FROM_EMAIL=marcoficweb@gmail.com
   ADMIN_NOTIFICATION_EMAIL=marcofic2010@gmail.com
   ```
   
   **Belangrijk:** De JSON moet als één regel string zijn, met alle quotes escaped.

   **Voor Vercel:**
   - Ga naar Vercel Dashboard → Project → Settings → Environment Variables
   - Voeg `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` toe
   - Plak de volledige JSON als waarde

## Stap 2: Enable Gmail API

1. **Ga naar Google Cloud Console:**
   - https://console.cloud.google.com/apis/library
   - Zoek naar "Gmail API"
   - Klik op "Enable"

## Stap 3: Configure Domain-Wide Delegation (Alleen voor Google Workspace)

Als je een Google Workspace account hebt:

1. **In Google Cloud Console:**
   - Ga naar je service account
   - Klik op "Show Domain-Wide Delegation"
   - Noteer de "Client ID"

2. **In Google Workspace Admin Console:**
   - Ga naar Security → API Controls → Domain-wide Delegation
   - Klik "Add new"
   - Voer Client ID in
   - Scopes: `https://www.googleapis.com/auth/gmail.send`
   - Authorize

## Stap 4: Test

1. **Herstart je dev server:**
   ```bash
   npm run dev
   ```

2. **Maak een test boeking**
3. **Check je terminal logs** voor Gmail API status
4. **Check je email inbox**

## Problemen Oplossen

### Error: "Insufficient Permission"
- Check of Gmail API is enabled
- Check of service account de juiste scopes heeft
- Voor persoonlijke Gmail: gebruik OAuth2 in plaats van service account

### Error: "Service account cannot impersonate user"
- Service accounts kunnen niet direct versturen namens gebruikers
- Gebruik OAuth2 voor persoonlijke Gmail accounts
- Of gebruik Resend als alternatief

### Service Account werkt niet met persoonlijke Gmail
- Service accounts zijn bedoeld voor Google Workspace
- Voor persoonlijke Gmail, gebruik OAuth2 of Resend

## Alternatief: Gebruik Resend

Als Gmail API te complex is, blijf Resend gebruiken. Je moet dan wel een domain verifiëren (zie `RESEND_DOMAIN_SETUP.md`).

## OAuth2 Setup (Voor Persoonlijke Gmail)

Als je OAuth2 wilt gebruiken in plaats van service accounts:

1. Maak OAuth2 credentials in Google Cloud Console
2. Gebruik `google-auth-library` met OAuth2 flow
3. Sla refresh token op in environment variables

Dit is complexer maar werkt wel met persoonlijke Gmail accounts.

