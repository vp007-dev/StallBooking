import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useBookings } from '@/hooks/useBookings';
import { useStalls } from '@/hooks/useStalls';
import { supabase } from '@/integrations/supabase/client';
import { Shield, ArrowLeft, Loader2, Search, Users, MapPin, IndianRupee, LogOut, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Booking } from '@/types/stall';

const ADMIN_PASSWORD = 'stallbook2024';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [deletingBooking, setDeletingBooking] = useState<Booking | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', mobile: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { bookings, loading: bookingsLoading, refetch: refetchBookings } = useBookings();
  const { stalls, refetch: refetchStalls } = useStalls();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success('Welcome, Admin!');
    } else {
      toast.error('Invalid password');
    }
    setPassword('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.info('Logged out successfully');
  };

  const handleEditClick = (booking: Booking) => {
    setEditingBooking(booking);
    setEditForm({
      name: booking.name,
      email: booking.email,
      mobile: booking.mobile,
      address: booking.address,
    });
  };

  const handleEditSubmit = async () => {
    if (!editingBooking) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          name: editForm.name,
          email: editForm.email,
          mobile: editForm.mobile,
          address: editForm.address,
        })
        .eq('id', editingBooking.id);

      if (error) throw error;
      toast.success('Booking updated successfully');
      setEditingBooking(null);
      refetchBookings();
    } catch (err) {
      toast.error('Failed to update booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBooking) return;
    setIsSubmitting(true);
    try {
      // First delete the booking
      const { error: bookingError } = await supabase
        .from('bookings')
        .delete()
        .eq('id', deletingBooking.id);

      if (bookingError) throw bookingError;

      // Then mark the stall as vacant
      const { error: stallError } = await supabase
        .from('stalls')
        .update({ is_booked: false })
        .eq('id', deletingBooking.stall_id);

      if (stallError) throw stallError;

      toast.success('Booking deleted and stall marked as vacant');
      setDeletingBooking(null);
      refetchBookings();
      refetchStalls();
    } catch (err) {
      toast.error('Failed to delete booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.booking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.stall_id.includes(searchTerm)
  );

  const totalRevenue = bookings.reduce((sum, booking) => {
    const stall = stalls.find(s => s.id === booking.stall_id);
    return sum + (stall?.price || 0);
  }, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-scale-in">
          <CardHeader className="text-center">
            <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full gradient-primary flex items-center justify-center mb-4 shadow-glow">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-display">Admin Access</CardTitle>
            <CardDescription className="text-sm">Enter the admin password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                />
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                Login
              </Button>
              <Link to="/">
                <Button type="button" variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Map
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-display font-bold text-foreground">Admin</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">StallBook Management</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">View Map</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1 sm:gap-2 text-destructive hover:text-destructive text-xs sm:text-sm px-2 sm:px-3">
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold font-display">{bookings.length}</p>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-bold font-display">{stalls.filter(s => s.is_booked).length}</p>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">Booked</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-2xl font-bold font-display">₹{totalRevenue.toLocaleString()}</p>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl font-display">All Bookings</CardTitle>
                <CardDescription className="text-xs sm:text-sm">View and manage stall reservations</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 pt-0">
            {bookingsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                {searchTerm ? 'No bookings match your search' : 'No bookings yet'}
              </div>
            ) : (
              <>
                {/* Mobile Cards View */}
                <div className="block sm:hidden space-y-3">
                  {filteredBookings.map((booking) => {
                    const stall = stalls.find(s => s.id === booking.stall_id);
                    return (
                      <div key={booking.id} className="bg-secondary/50 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-foreground">{booking.name}</p>
                            <p className="text-xs text-muted-foreground">{booking.email}</p>
                          </div>
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-md text-xs font-bold text-primary">
                            #{booking.stall_id}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">📱 {booking.mobile}</span>
                          {stall && <span className="font-semibold text-emerald-600">₹{stall.price}</span>}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">📍 {booking.address}</p>
                        <div className="flex justify-between items-center pt-2 border-t border-border">
                          <span className="text-[10px] text-muted-foreground">
                            {format(new Date(booking.created_at), 'MMM d, yyyy HH:mm')}
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => handleEditClick(booking)}>
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="destructive" className="h-7 px-2" onClick={() => setDeletingBooking(booking)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop Table View */}
                <div className="hidden sm:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Booking ID</TableHead>
                        <TableHead className="text-xs">Stall</TableHead>
                        <TableHead className="text-xs">Name</TableHead>
                        <TableHead className="text-xs">Email</TableHead>
                        <TableHead className="text-xs">Mobile</TableHead>
                        <TableHead className="text-xs">Address</TableHead>
                        <TableHead className="text-xs">Date</TableHead>
                        <TableHead className="text-xs text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => {
                        const stall = stalls.find(s => s.id === booking.stall_id);
                        return (
                          <TableRow key={booking.id}>
                            <TableCell className="font-mono text-xs">{booking.booking_id}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent rounded-md text-xs font-medium">
                                #{booking.stall_id}
                                {stall && <span className="text-muted-foreground">• ₹{stall.price}</span>}
                              </span>
                            </TableCell>
                            <TableCell className="font-medium text-sm">{booking.name}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{booking.email}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{booking.mobile}</TableCell>
                            <TableCell className="max-w-[200px] truncate text-muted-foreground text-sm" title={booking.address}>
                              {booking.address}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                              {format(new Date(booking.created_at), 'MMM d, yyyy HH:mm')}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" className="h-8 px-2" onClick={() => handleEditClick(booking)}>
                                  <Pencil className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                                <Button size="sm" variant="destructive" className="h-8 px-2" onClick={() => setDeletingBooking(booking)}>
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Edit Dialog */}
      <Dialog open={!!editingBooking} onOpenChange={() => setEditingBooking(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Update booking details for stall #{editingBooking?.stall_id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-mobile">Mobile</Label>
              <Input
                id="edit-mobile"
                value={editForm.mobile}
                onChange={(e) => setEditForm(prev => ({ ...prev, mobile: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={editForm.address}
                onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingBooking(null)}>Cancel</Button>
            <Button onClick={handleEditSubmit} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingBooking} onOpenChange={() => setDeletingBooking(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the booking for <strong>{deletingBooking?.name}</strong> (Stall #{deletingBooking?.stall_id}) and mark the stall as vacant. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
