#!/bin/bash
# Migration script voor Supabase

echo "📋 MARCOFIC Database Migration"
echo "================================"
echo ""
echo "Optie 1: Voer SQL handmatig uit in Supabase Dashboard"
echo "  1. Ga naar: https://supabase.com/dashboard/project/vxjviyzzonblhvbyulhb/sql"
echo "  2. Kopieer de inhoud van: database/schema.sql"
echo "  3. Plak in SQL Editor en klik 'Run'"
echo ""
echo "Optie 2: Via Supabase CLI (als je ingelogd bent)"
echo "  supabase db push"
echo ""
echo "Optie 3: Via psql (als je database wachtwoord hebt)"
echo "  psql \$DATABASE_URL -f database/schema.sql"
echo ""
