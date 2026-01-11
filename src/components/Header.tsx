import { Link } from 'react-router-dom';
import { MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass-effect shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-display font-bold text-foreground">StallBook</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Event Stall Booking</p>
          </div>
        </Link>

        <Link to="/admin">
          <Button variant="outline" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
