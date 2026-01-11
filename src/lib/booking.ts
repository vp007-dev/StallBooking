import { supabase } from '@/integrations/supabase/client';
import { BookingFormData } from '@/types/stall';

function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `STL-${timestamp}-${random}`;
}

export async function bookStall(stallId: string, formData: BookingFormData) {
  const bookingId = generateBookingId();

  // Start a transaction-like operation
  const { error: bookingError } = await supabase
    .from('bookings')
    .insert({
      stall_id: stallId,
      booking_id: bookingId,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      address: formData.address,
    });

  if (bookingError) {
    throw new Error(bookingError.message);
  }

  // Update stall status
  const { error: stallError } = await supabase
    .from('stalls')
    .update({ is_booked: true, updated_at: new Date().toISOString() })
    .eq('id', stallId);

  if (stallError) {
    throw new Error(stallError.message);
  }

  return bookingId;
}
