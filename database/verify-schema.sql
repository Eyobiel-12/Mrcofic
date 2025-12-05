-- Verification queries voor appointments tabel
-- Voer deze uit in Supabase SQL Editor om te controleren of alles correct is ingesteld

-- 1. Check of de tabel bestaat en alle kolommen heeft
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'appointments' 
ORDER BY ordinal_position;

-- 2. Check of de unique constraint bestaat (belangrijk voor race condition preventie)
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'appointments' 
AND indexdef LIKE '%unique%';

-- 3. Check of alle indexes bestaan
SELECT indexname 
FROM pg_indexes 
WHERE tablename = 'appointments';

-- 4. Check of de check constraint bestaat
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'appointments'::regclass 
AND contype = 'c';

-- 5. Test insert (zou moeten werken)
INSERT INTO appointments (name, email, date, time) 
VALUES ('Test User', 'test@example.com', CURRENT_DATE, '10:00-10:30')
RETURNING *;

-- 6. Test duplicate insert (zou moeten falen met unique constraint)
-- Deze zou een error moeten geven:
INSERT INTO appointments (name, email, date, time) 
VALUES ('Test User 2', 'test2@example.com', CURRENT_DATE, '10:00-10:30');

-- 7. Cleanup test data
DELETE FROM appointments WHERE email LIKE 'test%@example.com';

