#!/bin/bash
# MARCOFIC Database Migration Script

echo "🚀 MARCOFIC Database Migration"
echo "================================"
echo ""

# Check if SUPABASE_ACCESS_TOKEN is set
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
  echo "⚠️  SUPABASE_ACCESS_TOKEN niet gevonden"
  echo ""
  echo "📋 Optie 1: Handmatig via Supabase Dashboard (AANBEVOLEN)"
  echo "   1. Ga naar: https://supabase.com/dashboard/project/vxjviyzzonblhvbyulhb/sql/new"
  echo "   2. Open: database/schema.sql"
  echo "   3. Kopieer alle SQL code"
  echo "   4. Plak in SQL Editor en klik 'Run'"
  echo ""
  echo "📋 Optie 2: Via Supabase CLI met access token"
  echo "   1. Haal access token op: https://supabase.com/dashboard/account/tokens"
  echo "   2. Export token: export SUPABASE_ACCESS_TOKEN=your_token"
  echo "   3. Run dit script opnieuw"
  echo ""
  exit 1
fi

# Try to execute migration via Supabase API
PROJECT_REF="vxjviyzzonblhvbyulhb"
SQL_FILE="database/schema.sql"

if [ ! -f "$SQL_FILE" ]; then
  echo "❌ SQL bestand niet gevonden: $SQL_FILE"
  exit 1
fi

echo "📤 Migratie uitvoeren naar project: $PROJECT_REF"
echo ""

# Use Supabase Management API to execute SQL
curl -X POST \
  "https://api.supabase.com/v1/projects/$PROJECT_REF/database/query" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "query": $(cat "$SQL_FILE" | jq -Rs .)
}
EOF

echo ""
echo "✅ Migratie voltooid!"

