-- Create stalls table
CREATE TABLE public.stalls (
  id TEXT PRIMARY KEY,
  zone TEXT NOT NULL,
  price INTEGER NOT NULL,
  zone_type TEXT NOT NULL,
  is_booked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stall_id TEXT NOT NULL REFERENCES public.stalls(id),
  booking_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stalls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Stalls are publicly readable (everyone can see stall status)
CREATE POLICY "Anyone can view stalls"
ON public.stalls
FOR SELECT
USING (true);

-- Bookings can be created by anyone (public booking)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Bookings are only readable by admin (we'll handle this in app)
CREATE POLICY "Anyone can view bookings"
ON public.bookings
FOR SELECT
USING (true);

-- Anyone can update stalls (for booking status)
CREATE POLICY "Anyone can update stalls"
ON public.stalls
FOR UPDATE
USING (true);

-- Enable realtime for stalls table
ALTER PUBLICATION supabase_realtime ADD TABLE public.stalls;

-- Insert all stalls data
-- Central stalls (around Flag hoisting) - 2500/3000
INSERT INTO public.stalls (id, zone, price, zone_type) VALUES
('1', 'Central', 3000, 'Flag hoisting area'),
('2', 'Central', 3000, 'Flag hoisting area'),
('3', 'Central', 3000, 'Flag hoisting area'),
('4', 'Central', 2500, 'Flag hoisting area'),
('5', 'Central', 2500, 'Flag hoisting area'),
('6', 'Central', 2500, 'Flag hoisting area'),
('7', 'Central', 2500, 'Flag hoisting area'),
('8', 'Central', 2500, 'Flag hoisting area'),
('9', 'Central', 2500, 'Flag hoisting area'),
('10', 'Central', 2500, 'Flag hoisting area'),
('11', 'Central', 2500, 'Flag hoisting area'),
('12', 'Central', 2500, 'Flag hoisting area');

-- Left side stalls (13-22) - 2500 Fully Covered
INSERT INTO public.stalls (id, zone, price, zone_type) VALUES
('13', 'Left', 2500, 'Fully Covered'),
('14', 'Left', 2500, 'Fully Covered'),
('15', 'Left', 2500, 'Fully Covered'),
('16', 'Left', 2500, 'Fully Covered'),
('17', 'Left', 2500, 'Fully Covered'),
('18', 'Left', 2500, 'Fully Covered'),
('19', 'Left', 2500, 'Fully Covered'),
('20', 'Left', 2500, 'Fully Covered'),
('21', 'Left', 2500, 'Fully Covered'),
('22', 'Left', 2500, 'Fully Covered');

-- Top stalls (23-32) - 2500 Fully Covered
INSERT INTO public.stalls (id, zone, price, zone_type) VALUES
('23', 'Top', 2500, 'Fully Covered'),
('24', 'Top', 2500, 'Fully Covered'),
('25', 'Top', 2500, 'Fully Covered'),
('26', 'Top', 2500, 'Fully Covered'),
('27', 'Top', 2500, 'Fully Covered'),
('28', 'Top', 2500, 'Fully Covered'),
('29', 'Top', 2500, 'Fully Covered'),
('30', 'Top', 2500, 'Fully Covered'),
('31', 'Top', 2500, 'Fully Covered'),
('32', 'Top', 2500, 'Fully Covered');

-- Right side stalls (33-42) - 2000 Only Back Covered
INSERT INTO public.stalls (id, zone, price, zone_type) VALUES
('33', 'Right', 2000, 'Only Back Covered'),
('34', 'Right', 2000, 'Only Back Covered'),
('35', 'Right', 2000, 'Only Back Covered'),
('36', 'Right', 2000, 'Only Back Covered'),
('37', 'Right', 2000, 'Only Back Covered'),
('38', 'Right', 2000, 'Only Back Covered'),
('39', 'Right', 2000, 'Only Back Covered'),
('40', 'Right', 2000, 'Only Back Covered'),
('41', 'Right', 2000, 'Only Back Covered'),
('42', 'Right', 2000, 'Only Back Covered');

-- Bottom right stalls (43-48) - 1500 Fully Open
INSERT INTO public.stalls (id, zone, price, zone_type) VALUES
('43', 'Bottom Right', 1500, 'Fully Open'),
('44', 'Bottom Right', 1500, 'Fully Open'),
('45', 'Bottom Right', 1500, 'Fully Open'),
('46', 'Bottom Right', 1500, 'Fully Open'),
('47', 'Bottom Right', 1500, 'Fully Open'),
('48', 'Bottom Right', 1500, 'Fully Open');

-- Bottom left stalls (49-54) - 1500 Fully Open
INSERT INTO public.stalls (id, zone, price, zone_type) VALUES
('49', 'Bottom Left', 1500, 'Fully Open'),
('50', 'Bottom Left', 1500, 'Fully Open'),
('51', 'Bottom Left', 1500, 'Fully Open'),
('52', 'Bottom Left', 1500, 'Fully Open'),
('53', 'Bottom Left', 1500, 'Fully Open'),
('54', 'Bottom Left', 1500, 'Fully Open');