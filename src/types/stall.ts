export interface Stall {
  id: string;
  zone: string;
  price: number;
  zone_type: string;
  is_booked: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  stall_id: string;
  booking_id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  created_at: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  mobile: string;
  address: string;
}
