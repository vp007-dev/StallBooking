import { Stall } from '@/types/stall';
import { cn } from '@/lib/utils';

interface StallBoxProps {
  stall: Stall;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function StallBox({ stall, onClick, size = 'md' }: StallBoxProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs sm:w-11 sm:h-11',
    md: 'w-12 h-12 text-sm xl:w-14 xl:h-14',
    lg: 'w-16 h-16 text-base',
  };

  return (
    <button
      onClick={onClick}
      disabled={stall.is_booked}
      className={cn(
        'flex items-center justify-center font-bold rounded-xl transition-all duration-300 shadow-md',
        sizeClasses[size],
        stall.is_booked
          ? 'bg-gradient-to-br from-red-400 to-red-500 text-white cursor-not-allowed opacity-90 shadow-red-200'
          : 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white hover:from-emerald-500 hover:to-emerald-700 hover:scale-110 hover:-translate-y-1 cursor-pointer shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300 active:scale-95'
      )}
      title={
        stall.is_booked
          ? `Stall ${stall.id} - Booked`
          : `Stall ${stall.id} - ₹${stall.price} (${stall.zone_type}) - Click to book`
      }
    >
      {stall.id}
    </button>
  );
}
