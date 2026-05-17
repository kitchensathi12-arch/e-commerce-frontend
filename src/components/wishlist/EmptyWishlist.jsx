export function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-scale-in col-span-full">
      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-50 to-[#FFF4E0] flex items-center justify-center text-5xl mb-6 border-4 border-red-100">
        🤍
      </div>
      <h3 className="font-playfair text-2xl font-bold text-[#5C3A1E] mb-2">Wishlist is empty</h3>
      <p className="text-[#6B5B45] text-sm text-center max-w-xs">
        Save your favourite kitchen appliances here and shop them anytime you want!
      </p>
    </div>
  );
}
