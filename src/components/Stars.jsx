import { Star } from 'lucide-react';

export function Stars({ rating, size = 14 }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(rating) ? 'text-amber-light' : 'text-[#DDD]'}>
          <Star size={size} />
        </span>
      ))}
    </span>
  );
}
