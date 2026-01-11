export function Legend() {
  return (
    <div className="p-4 sm:p-6 bg-card rounded-xl shadow-sm border border-border">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md" />
          <span className="text-sm font-medium">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-400 to-red-500 shadow-md opacity-90" />
          <span className="text-sm font-medium">Booked</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-2">
          <span className="text-lg font-bold text-green-600">₹1500</span>
          <p className="text-xs text-green-700">Fully Open</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
          <span className="text-lg font-bold text-blue-600">₹2000</span>
          <p className="text-xs text-blue-700">Back Covered</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-2">
          <span className="text-lg font-bold text-primary">₹2500</span>
          <p className="text-xs text-primary">Fully Covered</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
          <span className="text-lg font-bold text-amber-600">₹3000</span>
          <p className="text-xs text-amber-700">Premium Central</p>
        </div>
      </div>
    </div>
  );
}
