import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Stall, BookingFormData } from '@/types/stall';
import { bookStall } from '@/lib/booking';
import { toast } from 'sonner';
import { MapPin, IndianRupee, CheckCircle, Loader2 } from 'lucide-react';
import { z } from 'zod';

const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  address: z.string().trim().min(10, 'Address must be at least 10 characters').max(500, 'Address too long'),
});

interface BookingModalProps {
  stall: Stall | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookingModal({ stall, open, onClose, onSuccess }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const handleClose = () => {
    setFormData({ name: '', email: '', mobile: '', address: '' });
    setBookingId(null);
    setErrors({});
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stall) return;

    // Validate form data
    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof BookingFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const id = await bookStall(stall.id, formData);
      setBookingId(id);
      onSuccess();
      toast.success('Stall booked successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to book stall');
    } finally {
      setLoading(false);
    }
  };

  if (!stall) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {bookingId ? (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="mx-auto w-16 h-16 bg-stall-available rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display">Booking Confirmed!</DialogTitle>
              <DialogDescription>
                Your stall has been successfully booked.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-accent rounded-xl p-4 space-y-2">
              <p className="text-sm text-muted-foreground">Your Booking ID</p>
              <p className="text-xl font-bold font-display text-primary">{bookingId}</p>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Stall #{stall.id} • {stall.zone_type}</p>
              <p className="font-semibold">₹{stall.price}</p>
            </div>
            <Button onClick={handleClose} className="w-full gradient-primary text-primary-foreground">
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-display">Book Stall #{stall.id}</DialogTitle>
              <DialogDescription>
                Fill in your details to reserve this stall.
              </DialogDescription>
            </DialogHeader>

            {/* Stall Info */}
            <div className="flex gap-4 p-4 bg-accent rounded-xl">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">{stall.zone_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">{stall.price}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="10-digit mobile number"
                  className={errors.mobile ? 'border-destructive' : ''}
                />
                {errors.mobile && <p className="text-xs text-destructive">{errors.mobile}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your complete address"
                  rows={3}
                  className={errors.address ? 'border-destructive' : ''}
                />
                {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 gradient-primary text-primary-foreground">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
