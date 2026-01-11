import { useState } from 'react';
import { Header } from '@/components/Header';
import { StallMap } from '@/components/StallMap';
import { BookingModal } from '@/components/BookingModal';
import { Legend } from '@/components/Legend';
import { StatsBar } from '@/components/StatsBar';
import { useStalls } from '@/hooks/useStalls';
import { Stall } from '@/types/stall';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { stalls, loading, error, refetch } = useStalls();
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleStallClick = (stall: Stall) => {
    if (!stall.is_booked) {
      setSelectedStall(stall);
      setModalOpen(true);
    }
  };

  const handleBookingSuccess = () => {
    refetch();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm sm:text-base">Loading stalls...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center space-y-4">
          <p className="text-destructive font-medium">Error loading stalls</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-2 sm:space-y-4 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold">
            Book Your <span className="text-gradient">Event Stall</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Select an available stall from the map below. Click on any green stall to reserve your spot.
          </p>
        </div>

        {/* Stats */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <StatsBar stalls={stalls} />
        </div>

        {/* Legend */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Legend />
        </div>

        {/* Map */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <StallMap stalls={stalls} onStallClick={handleStallClick} />
        </div>
      </main>

      <BookingModal
        stall={selectedStall}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default Index;
