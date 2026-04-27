
export interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface Brand {
  _id: string;
  brand_name: string;
  brand_logo?: string;
  isActive?: boolean;
}

export interface ProductImage {
  image_url: string;
  image_public_id?: string;
  _id?: string;
}

export interface Product {
  _id: string;
  product_name: string;
  product_title?: string;
  product_selling_price: number;
  product_mrp_price: number;
  product_discount?: number;
  product_stock: number;
  product_images?: ProductImage;
  is_featured?: boolean;
  is_new_arrival?: boolean;
  rating?: number;
  reviews?: number;
  badge?: string;
  category?: { _id: string; name: string };
  brand?: { _id: string; brand_name: string };
}

export interface SidebarItem {
  id: string;
  name: string;
  count?: number;
}



export interface ProductListParams {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface SidebarSectionProps {
  title: string;
  options: SidebarItem[];
  selected: string[];
  onChange: (id: string[]) => void;
};


export interface ProductCardProps {
  product: Product;
  view: 'grid' | 'list';
};


export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}