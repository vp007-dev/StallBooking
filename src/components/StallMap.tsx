import { Stall } from '@/types/stall';
import { StallBox } from './StallBox';

interface StallMapProps {
  stalls: Stall[];
  onStallClick: (stall: Stall) => void;
}

export function StallMap({ stalls, onStallClick }: StallMapProps) {
  const getStallById = (id: string) => stalls.find(s => s.id === id);

  return (
    <div className="w-full">
      {/* Mobile View */}
      <div className="block lg:hidden">
        <MobileStallMap stalls={stalls} onStallClick={onStallClick} getStallById={getStallById} />
      </div>
      
      {/* Desktop View */}
      <div className="hidden lg:block">
        <DesktopStallMap stalls={stalls} onStallClick={onStallClick} getStallById={getStallById} />
      </div>
    </div>
  );
}

interface StallMapViewProps {
  stalls: Stall[];
  onStallClick: (stall: Stall) => void;
  getStallById: (id: string) => Stall | undefined;
}

function MobileStallMap({ onStallClick, getStallById }: StallMapViewProps) {
  return (
    <div className="bg-gradient-to-br from-card to-secondary/30 rounded-2xl shadow-xl border border-border p-4">
      {/* Top Section - ₹2500 Fully Covered */}
      <div className="mb-6">
        <div className="bg-primary/10 rounded-xl p-3 border border-primary/20 mb-3">
          <h3 className="text-center font-bold text-primary text-sm mb-3">₹2500/- – Fully Covered (Top)</h3>
          <div className="grid grid-cols-5 gap-2 justify-items-center">
            {['23', '24', '25', '26', '27', '28', '29', '30', '31', '32'].map(id => {
              const stall = getStallById(id);
              return stall ? (
                <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="sm" />
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Left Section - ₹2500 Fully Covered */}
      <div className="mb-6">
        <div className="bg-primary/10 rounded-xl p-3 border border-primary/20">
          <h3 className="text-center font-bold text-primary text-sm mb-3">₹2500/- – Fully Covered (Left)</h3>
          <div className="grid grid-cols-5 gap-2 justify-items-center">
            {['22', '21', '20', '19', '18', '17', '16', '15', '14', '13'].map(id => {
              const stall = getStallById(id);
              return stall ? (
                <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="sm" />
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Right Section - ₹2000 Only Back Covered */}
      <div className="mb-6">
        <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/20">
          <h3 className="text-center font-bold text-blue-600 text-sm mb-3">₹2000/- – Only Back Covered (Right)</h3>
          <div className="grid grid-cols-5 gap-2 justify-items-center">
            {['33', '34', '35', '36', '37', '38', '39', '40', '41', '42'].map(id => {
              const stall = getStallById(id);
              return stall ? (
                <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="sm" />
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Center Section - Flag Hoisting Area */}
      <div className="mb-6">
        <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20">
          <h3 className="text-center font-bold text-amber-600 text-sm mb-3">Central Area (₹2500 - ₹3000)</h3>
          
          <div className="flex flex-col items-center gap-3">
            {/* Top row (7,8,9) - ₹2500 */}
            <div className="flex gap-2">
              {['9', '8', '7'].map(id => {
                const stall = getStallById(id);
                return stall ? (
                  <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="sm" />
                ) : null;
              })}
            </div>
            
            {/* Middle with Flag */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-2">
                {['10', '11', '12'].map(id => {
                  const stall = getStallById(id);
                  return stall ? (
                    <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="sm" />
                  ) : null;
                })}
              </div>
              
              <div className="w-20 h-16 bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-300 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-amber-700 text-center">🚩 Flag<br/>Hoisting</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {['6', '5', '4'].map(id => {
                  const stall = getStallById(id);
                  return stall ? (
                    <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="sm" />
                  ) : null;
                })}
              </div>
            </div>
            
            {/* Bottom row (1,2,3) - ₹3000 */}
            <div className="flex gap-2">
              {['1', '2', '3'].map(id => {
                const stall = getStallById(id);
                return stall ? (
                  <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="sm" />
                ) : null;
              })}
            </div>
            <span className="text-xs font-semibold text-amber-700">Premium ₹3000</span>
          </div>
        </div>
      </div>

      {/* Bottom Section - ₹1500 Fully Open */}
      <div className="mb-4">
        <div className="bg-green-500/10 rounded-xl p-3 border border-green-500/20">
          <h3 className="text-center font-bold text-green-600 text-sm mb-3">₹1500/- – Fully Open (Bottom)</h3>
          <div className="grid grid-cols-6 gap-2 justify-items-center mb-2">
            {['54', '53', '52', '51', '50', '49'].map(id => {
              const stall = getStallById(id);
              return stall ? (
                <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="sm" />
              ) : null;
            })}
          </div>
          <div className="grid grid-cols-6 gap-2 justify-items-center">
            {['48', '47', '46', '45', '44', '43'].map(id => {
              const stall = getStallById(id);
              return stall ? (
                <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="sm" />
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Entry */}
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground px-6 py-2 rounded-full text-sm font-bold shadow-lg">
          🚪 Entry
        </div>
      </div>

      {/* Info */}
      <div className="text-center mt-4 bg-accent/50 rounded-xl px-4 py-3">
        <p className="text-sm text-foreground font-medium">🥤 Water bottle + 🍽️ Food coupon included</p>
      </div>
    </div>
  );
}

function DesktopStallMap({ onStallClick, getStallById }: StallMapViewProps) {
  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-card to-secondary/30 rounded-3xl shadow-xl border border-border p-8 xl:p-12">
      {/* Top Price Label */}
      <div className="text-center mb-6">
        <span className="inline-block px-6 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-bold border border-primary/20">
          ₹2500/- – Fully Covered
        </span>
      </div>

      {/* Main Map Container */}
      <div className="relative bg-background/50 rounded-2xl border-2 border-foreground/10 p-6 xl:p-8">
        
        {/* Top row (23-32) */}
        <div className="flex justify-center gap-2 xl:gap-3 mb-8">
          {['23', '24', '25', '26', '27', '28', '29', '30', '31', '32'].map(id => {
            const stall = getStallById(id);
            return stall ? (
              <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="md" />
            ) : null;
          })}
        </div>

        {/* Main content area */}
        <div className="flex justify-between items-stretch gap-4 xl:gap-8">
          
          {/* Left column with label */}
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 rounded-lg px-2 py-1 mb-3 border border-primary/20">
              <span className="text-xs font-bold text-primary whitespace-nowrap">₹2500 Fully Covered</span>
            </div>
            <div className="flex flex-col gap-2 xl:gap-3">
              {['22', '21', '20', '19', '18', '17', '16', '15', '14', '13'].map(id => {
                const stall = getStallById(id);
                return stall ? (
                  <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="md" />
                ) : null;
              })}
            </div>
          </div>

          {/* Center area with flag hoisting */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Central stall container */}
            <div className="relative bg-gradient-to-br from-accent to-secondary/50 rounded-2xl p-6 xl:p-8 border-2 border-dashed border-primary/40 shadow-inner">
              <div className="text-center mb-4">
                <span className="text-sm font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">₹2500</span>
              </div>
              
              {/* Top row of center (7,8,9) */}
              <div className="flex justify-center gap-2 xl:gap-3 mb-4">
                {['9', '8', '7'].map(id => {
                  const stall = getStallById(id);
                  return stall ? (
                    <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="md" />
                  ) : null;
                })}
              </div>

              {/* Middle section with Flag hoisting */}
              <div className="flex items-center gap-4 xl:gap-6 my-4">
                {/* Left side (10,11,12) */}
                <div className="flex flex-col gap-2 xl:gap-3">
                  {['10', '11', '12'].map(id => {
                    const stall = getStallById(id);
                    return stall ? (
                      <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="md" />
                    ) : null;
                  })}
                </div>
                
                {/* Flag hoisting center */}
                <div className="w-36 h-32 flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-300 rounded-xl shadow-inner">
                  <div className="text-center">
                    <span className="text-lg">🚩</span>
                    <p className="text-sm font-bold text-amber-700">Flag Hoisting</p>
                  </div>
                </div>

                {/* Right side (4,5,6) */}
                <div className="flex flex-col gap-2 xl:gap-3">
                  {['6', '5', '4'].map(id => {
                    const stall = getStallById(id);
                    return stall ? (
                      <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="md" />
                    ) : null;
                  })}
                </div>
              </div>

              {/* Bottom row of center (1,2,3) */}
              <div className="flex justify-center gap-2 xl:gap-3 mt-4">
                {['1', '2', '3'].map(id => {
                  const stall = getStallById(id);
                  return stall ? (
                    <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="md" />
                  ) : null;
                })}
              </div>

              <div className="text-center mt-4">
                <span className="text-sm font-bold text-amber-600 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-200">₹3000 Premium</span>
              </div>
            </div>

            {/* Info text below center */}
            <div className="text-center mt-6 space-y-2 bg-accent/50 rounded-xl px-6 py-4">
              <p className="text-sm text-foreground font-medium">🥤 One water bottle (1 L) &nbsp;•&nbsp; 🍽️ One food coupon with all stalls</p>
            </div>
          </div>

          {/* Right column with label */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-500/10 rounded-lg px-2 py-1 mb-3 border border-blue-500/20">
              <span className="text-xs font-bold text-blue-600 whitespace-nowrap">₹2000 Back Covered</span>
            </div>
            <div className="flex flex-col gap-2 xl:gap-3">
              {['33', '34', '35', '36', '37', '38', '39', '40', '41', '42'].map(id => {
                const stall = getStallById(id);
                return stall ? (
                  <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="md" />
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Bottom stalls row */}
        <div className="flex justify-between items-end mt-8 px-4">
          {/* Bottom left stalls (54-49) */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2 xl:gap-3">
              {['54', '53', '52', '51', '50', '49'].map(id => {
                const stall = getStallById(id);
                return stall ? (
                  <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="md" />
                ) : null;
              })}
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full border border-green-200">₹1500 – Fully Open</span>
          </div>

          {/* Entry marker */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-12 border-t-0 border-2 border-dashed border-primary/40 rounded-b-xl flex items-end justify-center pb-2">
              <span className="text-sm text-muted-foreground">↑</span>
            </div>
            <div className="bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground px-8 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/30 mt-2">
              🚪 Entry
            </div>
          </div>

          {/* Bottom right stalls (48-43) */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2 xl:gap-3">
              {['48', '47', '46', '45', '44', '43'].map(id => {
                const stall = getStallById(id);
                return stall ? (
                  <StallBox key={id} stall={stall} onClick={() => onStallClick(stall)} size="md" />
                ) : null;
              })}
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full border border-green-200">Fully Open – ₹1500</span>
          </div>
        </div>
      </div>
    </div>
  );
}
