import { Stall } from '@/types/stall';
import { MapPin, CheckCircle, XCircle } from 'lucide-react';

interface StatsBarProps {
  stalls: Stall[];
}

export function StatsBar({ stalls }: StatsBarProps) {
  const total = stalls.length;
  const booked = stalls.filter(s => s.is_booked).length;
  const available = total - booked;

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      <div className="bg-card rounded-xl p-3 sm:p-4 shadow-sm border border-border text-center">
        <div className="flex justify-center mb-1 sm:mb-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
        </div>
        <p className="text-xl sm:text-2xl font-bold font-display text-foreground">{total}</p>
        <p className="text-[10px] sm:text-xs text-muted-foreground">Total Stalls</p>
      </div>

      <div className="bg-card rounded-xl p-3 sm:p-4 shadow-sm border border-border text-center">
        <div className="flex justify-center mb-1 sm:mb-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
          </div>
        </div>
        <p className="text-xl sm:text-2xl font-bold font-display text-emerald-600">{available}</p>
        <p className="text-[10px] sm:text-xs text-muted-foreground">Available</p>
      </div>

      <div className="bg-card rounded-xl p-3 sm:p-4 shadow-sm border border-border text-center">
        <div className="flex justify-center mb-1 sm:mb-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          </div>
        </div>
        <p className="text-xl sm:text-2xl font-bold font-display text-red-500">{booked}</p>
        <p className="text-[10px] sm:text-xs text-muted-foreground">Booked</p>
      </div>
    </div>
  );
}
