export const SkeletonCard = ({ view }: { view: 'grid' | 'list' }) => {
  if (view === 'list') {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex gap-4 p-4 animate-pulse">
        <div className="w-28 h-28 flex-shrink-0 rounded-xl bg-gray-200" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-200 rounded-xl mt-3" />
      </div>
    </div>
  );
};