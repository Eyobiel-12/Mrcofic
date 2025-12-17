# 🔧 Resend Domain Setup Guide

## Probleem: 403 Error - "You can only send testing emails to your own email address"

Resend's gratis/test account laat alleen emails versturen naar je **geverifieerde email adres** (het adres waarmee je je Resend account hebt aangemaakt).

## Oplossing: Domain Verificatie

Om emails naar **elk adres** te kunnen sturen (zoals `marcofic2010@gmail.com`), moet je een **domain verifiëren** in Resend.

### Stap 1: Verifieer een Domain in Resend

1. **Ga naar Resend Dashboard:**
   - Login op https://resend.com
   - Ga naar **Domains** in het menu

2. **Voeg een Domain toe:**
   - Klik op **"Add Domain"**
   - Voer je domain in (bijv. `marcofic.nl` of `marcofic.com`)
   - Resend geeft je DNS records die je moet toevoegen

3. **Voeg DNS Records toe:**
   - Ga naar je domain provider (bijv. Namecheap, GoDaddy, etc.)
   - Voeg de DNS records toe die Resend heeft gegeven:
     - **SPF record**
     - **DKIM records** (meestal 3 records)
     - **DMARC record** (optioneel maar aanbevolen)

4. **Wacht op verificatie:**
   - Resend verifieert automatisch je domain (kan 5-30 minuten duren)
   - Je ziet een groene checkmark wanneer het geverifieerd is

### Stap 2: Update Environment Variables

Na domain verificatie, update je `.env.local` en Vercel environment variables:

```env
RESEND_FROM_EMAIL=noreply@jouwdomein.nl  # Gebruik je geverifieerde domain
ADMIN_NOTIFICATION_EMAIL=marcofic2010@gmail.com  # Nu kan je naar elk adres sturen
```

### Stap 3: Test

1. Herstart je dev server
2. Test met een nieuwe boeking
3. Check of de email aankomt op `marcofic2010@gmail.com`

## Tijdelijke Oplossing (Voor Testing)

Als je nog geen domain hebt geverifieerd, gebruik tijdelijk je geverifieerde email adres:

```env
ADMIN_NOTIFICATION_EMAIL=marcoficweb@gmail.com  # Je verified Resend email
```

## Belangrijk voor Productie

**Voor productie MOET je een domain verifiëren**, anders kunnen emails niet worden verstuurd naar andere adressen dan je verified email.

## Alternatief: Gebruik je Verified Email

Als je geen domain wilt verifiëren, gebruik dan `marcoficweb@gmail.com` als `ADMIN_NOTIFICATION_EMAIL` voor zowel development als productie.

