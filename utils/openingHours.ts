export const openingHours: Record<number, { open: string; close: string } | null> = {
  0: null, // Sunday - closed
  1: { open: "09:00", close: "14:30" }, // Monday
  2: { open: "09:00", close: "16:00" }, // Tuesday
  3: { open: "09:00", close: "14:30" }, // Wednesday
  4: { open: "09:00", close: "16:00" }, // Thursday
  5: { open: "09:00", close: "16:00" }, // Friday
  6: { open: "11:00", close: "15:00" }, // Saturday
}

