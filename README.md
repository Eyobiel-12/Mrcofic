# MARCOFIC - Afspraakboekingssysteem

Een moderne, productie-klare afspraakboekingsapplicatie gebouwd met Next.js 14 (App Router), Supabase en EmailJS.

## 🚀 Features

- **Directe slot-blokkering**: Tijdsblokken worden direct geblokkeerd bij boeken (status `pending`)
- **Race-condition preventie**: Database unique constraint voorkomt dubbele boekingen
- **Admin dashboard**: Beheer alle afspraken, goedkeuren/afwijzen
- **E-mail notificaties**: Automatische e-mails naar admin en klant via EmailJS
- **Responsive design**: Mobile-first, toegankelijke UI
- **Type-safe**: Volledig geschreven in TypeScript

## 📋 Vereisten

- Node.js 18+ 
- npm of yarn
- Supabase account
- EmailJS account

## 🛠️ Installatie

1. **Clone of download dit project**

2. **Installeer dependencies:**
```bash
npm install
```

3. **Configureer environment variables:**

Maak een `.env.local` bestand in de root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# EmailJS
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID_ADMIN=your_admin_template_id
EMAILJS_TEMPLATE_ID_USER_CONFIRM=your_confirm_template_id
EMAILJS_TEMPLATE_ID_USER_REJECT=your_reject_template_id
EMAILJS_USER_ID=your_user_id

# App config
ADMIN_NOTIFICATION_EMAIL=admin@domain.com
APP_BASE_URL=https://jouwdomein.nl
```

4. **Setup Supabase database:**

Voer het SQL script uit in Supabase SQL Editor (zie `database/schema.sql`)

5. **Configureer EmailJS templates:**

Maak 3 templates in EmailJS:
- `admin_notify`: Notificatie naar admin bij nieuwe booking
- `user_confirm`: Bevestigingsmail naar klant na goedkeuring
- `user_reject`: Afwijzingsmail naar klant

## 🗄️ Database Setup

Voer het SQL script uit in Supabase SQL Editor:

```sql
-- Zie database/schema.sql voor volledige SQL
```

De belangrijkste onderdelen:
- `appointments` tabel met unique constraint op `(date, time)`
- Indexes voor performante queries
- UUID primary keys

## 🏃 Development

Start de development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 📦 Build voor productie

```bash
npm run build
npm start
```

## 🚢 Deployment naar Vercel

1. **Push code naar GitHub**

2. **Import project in Vercel:**
   - Ga naar [vercel.com](https://vercel.com)
   - Import je GitHub repository
   - Configureer environment variables in Vercel dashboard

3. **Deploy:**
   - Vercel deployt automatisch bij elke push naar main branch

## 🔒 Beveiliging

- **Service Role Key**: Gebruik alleen server-side, nooit in client code
- **Environment Variables**: Plaats secrets in Vercel Secrets (niet in code)
- **Database**: Supabase RLS (Row Level Security) kan worden geconfigureerd voor extra beveiliging
- **Admin Dashboard**: Overweeg authenticatie toe te voegen voor admin routes

## 📧 EmailJS Setup

1. Maak account op [EmailJS](https://www.emailjs.com/)
2. Configureer email service (Gmail, SendGrid, etc.)
3. Maak 3 templates:
   - Admin notificatie template
   - User confirmatie template  
   - User afwijzing template
4. Kopieer template IDs naar `.env.local`

## 🧪 Testing

### Manual Testing Checklist

- [ ] Boek een afspraak → status wordt `pending`
- [ ] Probeer dubbele boeking opzelfde tijd → krijg 409 error
- [ ] Admin ontvangt notificatie e-mail
- [ ] Admin approve → klant ontvangt bevestigingsmail
- [ ] Admin reject → slot wordt weer vrij, klant ontvangt afwijzingsmail
- [ ] UI toont geblokkeerde slots correct
- [ ] Mobile responsive werkt goed

## 📁 Project Structuur

```
marcofic/
├── app/
│   ├── api/              # API routes
│   │   ├── book/         # POST /api/book
│   │   ├── appointments/ # GET /api/appointments
│   │   └── admin/        # Admin endpoints
│   ├── admin/            # Admin dashboard page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── BookingForm.tsx   # Booking form component
│   ├── TimeSlots.tsx     # Time slot selector
│   └── AdminDashboard.tsx # Admin dashboard
├── lib/
│   ├── supabaseClient.ts # Client-side Supabase
│   └── supabaseServer.ts # Server-side Supabase
├── utils/
│   ├── openingHours.ts   # Opening hours config
│   └── generateSlots.ts  # Time slot generator
└── database/
    └── schema.sql        # Database schema
```

## 🐛 Troubleshooting

### Database errors
- Controleer of Supabase URL en keys correct zijn
- Verifieer dat SQL schema is uitgevoerd
- Check Supabase logs voor details

### EmailJS errors
- Controleer template IDs
- Verifieer EmailJS service configuratie
- Check server logs voor email errors

### Build errors
- Verifieer alle environment variables zijn ingesteld
- Check TypeScript errors: `npm run build`
- Controleer Node.js versie (18+)

## 📝 License

Dit project is gemaakt voor MARCOFIC.

## 🤝 Support

Voor vragen of problemen, check de documentatie of neem contact op.

---

**Gemaakt met ❤️ voor MARCOFIC**





