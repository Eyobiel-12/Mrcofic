-- Add missing constraints and indexes to appointments table
-- Voer dit uit als de verificatie queries laten zien dat er iets ontbreekt

-- 1. Unique constraint op (date, time) - BELANGRIJK voor race condition preventie
CREATE UNIQUE INDEX IF NOT EXISTS appointments_date_time_idx 
ON appointments (date, time);

-- 2. Indexes voor performante queries
CREATE INDEX IF NOT EXISTS idx_appointments_status 
ON appointments (status);

CREATE INDEX IF NOT EXISTS idx_appointments_date 
ON appointments (date);

CREATE INDEX IF NOT EXISTS idx_appointments_created_at 
ON appointments (created_at);

-- 3. Check constraint voor status waarden
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'check_status' 
    AND conrelid = 'appointments'::regclass
  ) THEN
    ALTER TABLE appointments 
    ADD CONSTRAINT check_status 
    CHECK (status IN ('pending', 'approved', 'rejected'));
  END IF;
END $$;

-- 4. Comments voor documentatie
COMMENT ON TABLE appointments IS 'Stores all appointment bookings';
COMMENT ON COLUMN appointments.status IS 'pending: waiting for admin approval, approved: confirmed by admin, rejected: declined by admin';
COMMENT ON COLUMN appointments.time IS 'Time slot in format HH:MM-HH:MM (e.g., 11:00-11:30)';

