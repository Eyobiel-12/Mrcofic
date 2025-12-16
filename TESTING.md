# 🧪 Testing Guide - MARCOFIC

## ✅ Database Status

**Perfect!** De unique constraint werkt correct:
- ✅ Unique constraint `appointments_date_time_idx` is actief
- ✅ Dubbele boekingen worden geblokkeerd
- ✅ Race condition preventie werkt

De error die je zag is **verwacht gedrag** - het betekent dat de beveiliging werkt!

## 🚀 Test de Applicatie

### Stap 1: Installeer Dependencies

```bash
npm install
```

### Stap 2: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

### Stap 3: Test de Booking Flow

1. **Boek een afspraak:**
   - Kies een datum
   - Kies een tijdstip
   - Vul formulier in
   - Klik "Verzenden"

2. **Verifieer in Supabase:**
   - Ga naar Table Editor
   - Check dat nieuwe appointment status `pending` heeft
   - Check dat alle velden correct zijn opgeslagen

3. **Test dubbele boeking:**
   - Probeer opnieuw te boeken op hetzelfde tijdstip
   - Je zou een error moeten zien: "Dit tijdvak is al geboekt"
   - Dit komt door de unique constraint!

4. **Test Admin Dashboard:**
   - Ga naar http://localhost:3000/admin
   - Je zou de nieuwe appointment moeten zien
   - Test "Goedkeuren" → status wordt `approved`
   - Test "Afwijzen" → status wordt `rejected`, slot wordt weer vrij

## 📋 Test Checklist

- [ ] Development server start zonder errors
- [ ] Homepage laadt correct
- [ ] Datum kiezen werkt
- [ ] Tijdslots worden getoond
- [ ] Boeking formulier werkt
- [ ] Appointment wordt opgeslagen in database
- [ ] Dubbele boeking wordt geblokkeerd (409 error)
- [ ] Admin dashboard laadt
- [ ] Admin kan appointments zien
- [ ] Admin kan goedkeuren/afwijzen
- [ ] Status updates correct in database

## 🔍 Debugging

### Als booking niet werkt:

1. **Check browser console** voor errors
2. **Check server logs** in terminal
3. **Verifieer environment variables:**
   ```bash
   cat .env.local | grep SUPABASE
   ```

### Als admin dashboard niet werkt:

1. **Check API endpoints:**
   - http://localhost:3000/api/appointments?date=2025-12-05
   - http://localhost:3000/api/admin/appointments

2. **Check Supabase connection:**
   - Verifieer dat Service Role Key correct is
   - Check Supabase logs voor errors

## 🎯 Volgende Stappen

Na succesvolle tests:
1. ✅ Database werkt perfect
2. ⚠️ EmailJS configureren (voor e-mail notificaties)
3. ⚠️ Deploy naar Vercel
4. ⚠️ RLS inschakelen (optioneel, voor extra beveiliging)




