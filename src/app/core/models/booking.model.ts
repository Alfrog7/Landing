export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

export interface BookingRequest {
  date: string;
  timeSlot: string;
  fullName: string;
  corporateEmail: string;
  phone: string;
  companyRuc?: string;
  notes?: string;
}
