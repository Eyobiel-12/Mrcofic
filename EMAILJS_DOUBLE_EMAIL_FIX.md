# 🔧 EmailJS Double Email Fix

## Probleem
Je krijgt zowel een bevestigings- als een afwijzingsemail wanneer je alleen op "Goedkeuren" klikt.

## Oorzaak
Dit komt waarschijnlijk door een **Auto-Reply** of **Trigger** in EmailJS die automatisch emails verstuurt.

## Oplossing: Check EmailJS Auto-Reply

### Stap 1: Ga naar EmailJS Dashboard
1. Login op https://www.emailjs.com/
2. Ga naar **Email Templates**

### Stap 2: Check Beide Templates voor Auto-Reply

**Template 1: Bevestiging (`template_1yev2jo`)**
1. Klik op de template "Afspraak BEVSTIG"
2. Ga naar het tabblad **"Auto-Reply"**
3. **BELANGRIJK:** Zorg dat Auto-Reply **UIT** staat
   - ❌ NIET: Auto-Reply aan (enabled)
   - ✅ WEL: Auto-Reply uit (disabled)

**Template 2: Afwijzing (`template_e7fxcxv`)**
1. Klik op de template "Afspraak kon niet bevestigd worden"
2. Ga naar het tabblad **"Auto-Reply"**
3. **BELANGRIJK:** Zorg dat Auto-Reply **UIT** staat
   - ❌ NIET: Auto-Reply aan (enabled)
   - ✅ WEL: Auto-Reply uit (disabled)

### Stap 3: Check EmailJS Events
1. Ga naar EmailJS Dashboard → **Events**
2. Zoek naar de emails die zijn verzonden
3. Check of je ziet:
   - Twee API calls voor dezelfde appointment?
   - Een auto-reply trigger?
   - Beide templates worden getriggerd?

### Stap 4: Check Template Settings
1. Ga naar Email Templates
2. Open beide templates
3. Check het **"Settings"** tabblad
4. Zorg dat er geen automatische triggers zijn ingesteld

### Stap 5: Test Opnieuw
1. Maak een nieuwe test afspraak
2. Klik alleen op "Goedkeuren"
3. Check of je nu alleen de bevestigingsemail krijgt

---

## ✅ Checklist

- [ ] Auto-Reply is UIT voor bevestiging template
- [ ] Auto-Reply is UIT voor afwijzing template
- [ ] Geen triggers ingesteld in template Settings
- [ ] EmailJS Events toont alleen één email per actie
- [ ] Test: alleen bevestigingsemail bij goedkeuren

---

## 🆘 Als het probleem blijft

**Check EmailJS Dashboard → Events:**
- Kijk welke API calls er zijn gedaan
- Check of beide templates worden aangeroepen
- Check de timestamps - werden ze tegelijk verzonden?

**Mogelijke oorzaken:**
1. Auto-Reply is aan in één van de templates
2. Er is een trigger/automation ingesteld
3. Beide templates zijn gekoppeld aan dezelfde service
4. Er is een webhook of integration die beide emails verstuurt

