import { useQuery } from '@tanstack/react-query';

// -------------- local imports ---------------
import { getAllProducts } from '@/service/product.service';

export function ProductCard() {

  // ------------ all tanstack query start here ----------------
  const { data: Products, isLoading: isProductsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts({ page: 1, limit: 10 }),
  });

  if (isProductsLoading) {
    return <div>loading....</div>;
  }

  const productList = Array.isArray(Products?.data)
    ? Products.data
    : [];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3">
      {productList.map((item) => (
       <ProductCard item={item} />
      ))}
    </div>
  );
}
