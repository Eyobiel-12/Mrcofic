export function generateTimeSlots(open: string, close: string): string[] {
  const slots: string[] = []
  let [h, m] = open.split(":").map(Number)
  const [closeH, closeM] = close.split(":").map(Number)

  while (h < closeH || (h === closeH && m < closeM)) {
    const start = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
    m += 30
    if (m === 60) {
      m = 0
      h++
    }
    const end = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
    slots.push(`${start}-${end}`)
  }

  return slots
}

