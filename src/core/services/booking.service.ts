import type { BookingRequest, TimeSlot } from '../models/booking.model';

export const BookingService = {
  getAvailableTimeSlots(date: string): TimeSlot[] {
    const day = new Date(`${date}T00:00:00`).getDay();
    // Bloqueo de fines de semana (0 = domingo, 6 = sábado).
    if (day === 0 || day === 6) {
      return [];
    }

    const times: string[] = [];
    for (let minutes = 9 * 60; minutes <= 17 * 60 + 30; minutes += 30) {
      const hour = Math.floor(minutes / 60);
      const min = minutes % 60;
      const period = hour < 12 ? 'AM' : 'PM';
      const display = hour % 12 === 0 ? 12 : hour % 12;
      times.push(`${display}:${String(min).padStart(2, '0')} ${period}`);
    }

    return times.map((time, index) => ({
      id: `${date}-${index}`,
      time,
      isAvailable: (index * date.length) % 4 !== 3,
    }));
  },

  confirmBooking(request: BookingRequest): BookingRequest {
    // Confirmación simulada: el backend real reemplazará esta llamada.
    return request;
  },
};
