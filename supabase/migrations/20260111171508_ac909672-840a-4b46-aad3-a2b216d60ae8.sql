-- Add UPDATE policy for bookings table
CREATE POLICY "Anyone can update bookings"
ON public.bookings
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Add DELETE policy for bookings table
CREATE POLICY "Anyone can delete bookings"
ON public.bookings
FOR DELETE
USING (true);