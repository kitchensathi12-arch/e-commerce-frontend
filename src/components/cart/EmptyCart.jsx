export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-scale-in">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFF4E0] to-[#F5ECD7] flex items-center justify-center text-6xl mb-6 border-4 border-[#F0E8D4]">
        🛒
      </div>
      <h3 className="font-playfair text-2xl font-bold text-[#5C3A1E] mb-2">Your cart is empty!</h3>
      <p className="text-[#6B5B45] text-sm mb-8 text-center max-w-xs">
        Looks like you haven't added any kitchen appliances yet. Let's fix that!
      </p>
      <button
        // onClick={onShop}
        className="shimmer-btn bg-gradient-to-r from-[#D4860B] to-[#F0A830] text-white border-none cursor-pointer px-8 py-3.5 rounded-full font-bold text-[15px] hover:from-[#3E2610] hover:to-[#5C3A1E] transition-all shadow-lg shadow-[#D4860B]/25"
      >
        Start Shopping →
      </button>
    </div>
  );
}
