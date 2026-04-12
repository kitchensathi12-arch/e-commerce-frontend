/* eslint-disable @typescript-eslint/no-explicit-any */
import { getActiveBrands } from '@/services/BrandServices';
import { getActiveCategories } from '@/services/CategoryServices';
import { createProduct, getProductById, updateProduct, type ProductFormValues } from '@/services/ProductServices';
import { convertToBase64, createProductValidation, updateProductValidation, type IBrandDocument, type ICategoryDocument } from '@kitchensathi12-arch/ecommerce-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const inputClass =
  'w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-all';

const selectClass = 'w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition-all';

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-5">
    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5 pb-3 border-b border-gray-100">{title}</p>
    {children}
  </div>
);

export default function ProductForm() {
  // ----------------- hooks and states start here -------------------
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = id !== 'new';

  const [imageRemoved, setImageRemoved] = useState<any[]>([]); // To track removed images in edit mode

  // ----------------- tanstack api calls start here -------------------

  const { data: BrandsData, isLoading: isBrandLoading } = useQuery({
    queryKey: ['brands-options'],
    queryFn: () => getActiveBrands(),
  });

  const { data: CategoriesData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['categories-options'],
    queryFn: () => getActiveCategories(),
  });

  const { mutate: createProductMutation } = useMutation({
    mutationFn: (data: ProductFormValues) => createProduct(data),
    onSuccess: () => {
      toast.success('Product created successfully!');
      navigate('/products');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to create product. Please try again.';
      toast.error(errorMessage);
    },
  });

  const { mutate: updateProductMutation } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductFormValues }) => updateProduct(id, data),
    onSuccess: () => {
      toast.success('Product updated successfully!');
      navigate('/products');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Failed to update product. Please try again.';
      toast.error(errorMessage);
    },
  });

  const { data: productDetails, isLoading: isExistProductLoading } = useQuery({
    queryKey: ['product-detail', id],
    queryFn: () => getProductById(id as string),
    enabled: isEditMode,
  });

  // --------------- handle form with formik ---------------

  const { values, handleBlur, handleChange, handleSubmit, setFieldValue, touched, errors } = useFormik<ProductFormValues>({
    initialValues: {
      product_name: productDetails?.product_name || '',
      product_title: productDetails?.product_title || '',
      product_slug: productDetails?.product_slug || '',
      product_description: productDetails?.product_description || '',
      product_images: productDetails?.product_images || [],
      product_selling_price: productDetails?.product_selling_price || 0,
      product_mrp_price: productDetails?.product_mrp_price || 0,
      product_discount: productDetails?.product_discount || 0,
      category: productDetails?.category?._id.toString() || '',
      brand: productDetails?.brand?._id.toString() || '',
      active: productDetails?.active || false,
      product_sku: productDetails?.product_sku || '',
      product_stock: productDetails?.product_stock || 0,
      low_stock_threshold: productDetails?.low_stock_threshold || 5,
      in_stock: productDetails?.in_stock || false,
      meta_title: productDetails?.meta_title || '',
      meta_description: productDetails?.meta_description || '',
      meta_keywords: productDetails?.meta_keywords || [],
      product_tags: productDetails?.product_tags || [],
      is_featured: productDetails?.is_featured || false,
      is_new_arrival: productDetails?.is_new_arrival || false,
      product_details: productDetails?.product_details || [{ key: '', value: '' }],
    },
    enableReinitialize: true,
    validationSchema: isEditMode ? updateProductValidation : createProductValidation,
    onSubmit: async (values: ProductFormValues) => {
      if (isEditMode) {
        updateProductMutation({ id: id as string, data: values });
      } else {
        createProductMutation(values as ProductFormValues);
      }
    },
  });

  // -------------- all functions and handlers start here ---------------
  const handleImage = async (file: File | FileList) => {
    if (file instanceof FileList && file.length <= 0) return;

    if (isEditMode) {
      const files = file instanceof FileList ? Array.from(file) : [file];
      const fileUrl = await Promise.all(files.map(async (item: File) => await convertToBase64(item)));
      const setImages = fileUrl.map((img: Base64URLString, index: number) => {
        if (imageRemoved.length >= index + 1) {
          return { ...imageRemoved[0], image: img }; // Replace the first removed image with new one
        } else {
          return { image: img }; // Add new image if no removed images left to replace
        }
      });
      setFieldValue('product_images', [...values.product_images, ...setImages]);
    } else {
      const files = file instanceof FileList ? Array.from(file) : [file];
      const fileUrl = await Promise.all(files.map(async (item: File) => await convertToBase64(item)));
      setFieldValue('product_images', [...values.product_images, ...fileUrl]);
    }
  };

  const handleRemoveImage = (data: any) => {
    if (isEditMode) {
      setImageRemoved((prev) => [...prev, data]); // Store removed image IDs to send to backend on update
      setFieldValue(
        'product_images',
        values.product_images.filter((item: any) => item._id !== data._id)
      );
    } else {
      setFieldValue(
        'product_images',
        values.product_images.filter((_: Base64URLString, i: number) => i !== data)
      );
    }
  };

  const handleProductTags = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes(',')) {
      const tag = e.target.value.replace(',', '').trim();
      if (tag.length > 0 && !values.product_tags.includes(tag)) {
        setFieldValue('product_tags', [...values.product_tags, tag]);
      }
      e.target.value = '';
    }
  };

  const handleMetaKeywords = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes(',')) {
      const keyword = e.target.value.replace(',', '').trim();
      if (keyword.length > 0 && !values.meta_keywords.includes(keyword)) {
        setFieldValue('meta_keywords', [...values.meta_keywords, keyword]);
      }
      e.target.value = '';
    }
  };

  if (isBrandLoading || isCategoryLoading || isExistProductLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-[95%] mx-auto">
        {/* Page Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-800">{!isEditMode ? 'Add Product' : 'Edit Product'}</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in the details below to list a new product.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          {/* Basic Information */}
          <SectionCard title="Basic Information">
            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm font-semibold text-gray-600">
                Product name <span className="text-red-400">*</span>
              </label>
              <input name="product_name" value={values.product_name} onChange={handleChange} onBlur={handleBlur} className={inputClass} placeholder="e.g. Wireless Noise Cancelling Headphones" />
              {touched.product_name && errors.product_name && <p className="text-xs text-red-500 mt-0.5">{errors.product_name}</p>}
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm font-semibold text-gray-600">
                Product title <span className="text-red-400">*</span>
              </label>
              <input name="product_title" className={inputClass} value={values.product_title} onChange={handleChange} onBlur={handleBlur} placeholder="Short display title for storefront" />
              {touched.product_title && errors.product_title && <p className="text-xs text-red-500 mt-0.5">{errors.product_title}</p>}
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm font-semibold text-gray-600">
                Slug <span className="text-red-400">*</span>
              </label>
              <input name="product_slug" className={inputClass} onChange={handleChange} value={values.product_slug} onBlur={handleBlur} placeholder="wireless-noise-cancelling-headphones" />
              <span className="text-xs text-gray-400 mt-0.5">Auto-generated from name · must be unique</span>
              {touched.product_slug && errors.product_slug && <p className="text-xs text-red-500 mt-0.5">{errors.product_slug}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Description</label>
              <textarea
                name="product_description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.product_description}
                className={`${inputClass} min-h-22.5 resize-y`}
                placeholder="Full product description visible to customers…"
              />
              {touched.product_description && errors.product_description && <p className="text-xs text-red-500 mt-0.5">{errors.product_description}</p>}
            </div>
          </SectionCard>

          {/* Product Images */}
          <SectionCard title="Product Images *">
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Click to upload images</span>
                <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 10 MB each</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files && e.target.files.length > 0 && handleImage(e.target.files)}
              />
            </label>
            {touched.product_images && errors.product_images && typeof errors.product_images === 'string' && <p className="text-xs text-red-500 mt-2">{errors.product_images}</p>}

            {values.product_images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {values.product_images.map((img: any, index: number) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden border border-gray-200">
                    <img src={img.image || img.image_url || img} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemoveImage(isEditMode ? img : index)}
                      type="button"
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all text-xs leading-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          {/* Pricing */}
          <SectionCard title="Pricing">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">
                  Selling price <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                  <input
                    type="number"
                    name="product_selling_price"
                    className={`${inputClass} pl-7`}
                    onChange={handleChange}
                    value={values.product_selling_price}
                    onBlur={handleBlur}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                {touched.product_selling_price && errors.product_selling_price && <p className="text-xs text-red-500 mt-0.5">{errors.product_selling_price}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">
                  MRP price <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                  <input
                    type="number"
                    name="product_mrp_price"
                    className={`${inputClass} pl-7`}
                    value={values.product_mrp_price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                {touched.product_mrp_price && errors.product_mrp_price && <p className="text-xs text-red-500 mt-0.5">{errors.product_mrp_price}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">
                  Discount % <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="product_discount"
                    className={`${inputClass} pr-7`}
                    onChange={handleChange}
                    value={values.product_discount}
                    onBlur={handleBlur}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
                </div>
                {touched.product_discount && errors.product_discount && <p className="text-xs text-red-500 mt-0.5">{errors.product_discount}</p>}
              </div>
            </div>
          </SectionCard>

          {/* Classification */}
          <SectionCard title="Classification">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">
                  Category <span className="text-red-400">*</span>
                </label>
                <select name="category" className={selectClass} value={values.category} onChange={handleChange} onBlur={handleBlur}>
                  <option value="">Select category…</option>
                  {CategoriesData?.map((category: ICategoryDocument) => (
                    <option key={category._id.toString()} value={category._id.toString()}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {touched.category && errors.category && <p className="text-xs text-red-500 mt-0.5">{errors.category}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">
                  Brand <span className="text-red-400">*</span>
                </label>
                <select name="brand" className={selectClass} value={values.brand} onChange={handleChange} onBlur={handleBlur}>
                  <option value="">Select brand…</option>
                  {BrandsData?.map((brand: IBrandDocument) => (
                    <option key={brand._id.toString()} value={brand._id.toString()}>
                      {brand.brand_name}
                    </option>
                  ))}
                </select>
                {touched.brand && errors.brand && <p className="text-xs text-red-500 mt-0.5">{errors.brand}</p>}
              </div>
            </div>
          </SectionCard>

          {/* Inventory & Stock */}
          <SectionCard title="Inventory & Stock">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">SKU</label>
                <input
                  name="product_sku"
                  className={`${inputClass} uppercase`}
                  value={values.product_sku}
                  placeholder="e.g. WNC-BLK-001"
                  onChange={(e) => setFieldValue('product_sku', e.target.value.toUpperCase())}
                  onBlur={handleBlur}
                />
                <span className="text-xs text-gray-400 mt-0.5">Leave blank to auto-generate</span>
                {touched.product_sku && errors.product_sku && <p className="text-xs text-red-500 mt-0.5">{errors.product_sku}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">
                  Stock qty <span className="text-red-400">*</span>
                </label>
                <input type="number" name="product_stock" className={inputClass} onChange={handleChange} value={values.product_stock} onBlur={handleBlur} placeholder="0" min="0" />
                {touched.product_stock && errors.product_stock && <p className="text-xs text-red-500 mt-0.5">{errors.product_stock}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Low stock threshold</label>
                <input
                  type="number"
                  name="low_stock_threshold"
                  className={inputClass}
                  onChange={handleChange}
                  value={values.low_stock_threshold}
                  onBlur={handleBlur}
                  placeholder="5"
                  min="0"
                  defaultValue="5"
                />
                <span className="text-xs text-gray-400 mt-0.5">Alert when stock drops below this</span>
                {touched.low_stock_threshold && errors.low_stock_threshold && <p className="text-xs text-red-500 mt-0.5">{errors.low_stock_threshold}</p>}
              </div>
            </div>
          </SectionCard>

          {/* Tags & SEO */}
          <SectionCard title="Tags & SEO">
            <div className="flex flex-col gap-1 mb-5">
              <label className="text-sm font-semibold text-gray-600">Product tags</label>
              <div className="flex flex-wrap gap-1.5 px-3 py-2 border border-gray-300 bg-white rounded-lg min-h-[42px] cursor-text focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-300 transition-all">
                {values.product_tags.map((tag: string) => (
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-600 font-medium">
                    {tag}
                    <button
                      onClick={() =>
                        setFieldValue(
                          'product_tags',
                          values.product_tags.filter((t: string) => t !== tag)
                        )
                      }
                      type="button"
                      className="text-gray-400 hover:text-gray-700 leading-none ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input className="bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 min-w-[80px] flex-1" placeholder="Type and press Enter…" onChange={handleProductTags} />
              </div>
              <span className="text-xs text-gray-400 mt-0.5">Press Enter or comma to add a tag</span>
              {touched.product_tags && errors.product_tags && typeof errors.product_tags === 'string' && <p className="text-xs text-red-500 mt-0.5">{errors.product_tags}</p>}
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm font-semibold text-gray-600 flex justify-between">
                Meta title
                <span className="text-xs text-gray-400 font-normal">{values.meta_title.length}/60</span>
              </label>
              <input
                name="meta_title"
                className={inputClass}
                placeholder="SEO page title (60 chars recommended)"
                onChange={handleChange}
                value={values.meta_title}
                onBlur={handleBlur}
                maxLength={60}
              />
              {touched.meta_title && errors.meta_title && <p className="text-xs text-red-500 mt-0.5">{errors.meta_title}</p>}
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <label className="text-sm font-semibold text-gray-600 flex justify-between">
                Meta description
                <span className="text-xs text-gray-400 font-normal">{values.meta_description.length}/160</span>
              </label>
              <textarea
                name="meta_description"
                className={`${inputClass} min-h-[60px] resize-y`}
                placeholder="SEO description (160 chars recommended)"
                onChange={handleChange}
                value={values.meta_description}
                onBlur={handleBlur}
                maxLength={160}
              />
              {touched.meta_description && errors.meta_description && <p className="text-xs text-red-500 mt-0.5">{errors.meta_description}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Meta keywords</label>
              <div className="flex flex-wrap gap-1.5 px-3 py-2 border border-gray-300 bg-white rounded-lg min-h-[42px] cursor-text focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-300 transition-all">
                {values.meta_keywords.map((tag: string) => (
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-600 font-medium">
                    {tag}
                    <button
                      onClick={() =>
                        setFieldValue(
                          'meta_keywords',
                          values.meta_keywords.filter((t: string) => t !== tag)
                        )
                      }
                      type="button"
                      className="text-gray-400 hover:text-gray-700 leading-none ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input className="bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 min-w-[80px] flex-1" placeholder="Type and press Enter…" onChange={handleMetaKeywords} />
              </div>
              <span className="text-xs text-gray-400 mt-0.5">Press Enter or comma to add a keyword</span>
              {touched.meta_keywords && errors.meta_keywords && typeof errors.meta_keywords === 'string' && <p className="text-xs text-red-500 mt-0.5">{errors.meta_keywords}</p>}
            </div>
          </SectionCard>

          {/* Product Details (Key-Value) */}
          <SectionCard title="Product Details (Key–Value)">
            {values?.product_details?.map((detail, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center mb-3">
                <div className="flex flex-col gap-1">
                  <input
                    className={inputClass}
                    placeholder="Key (e.g. Material)"
                    value={detail.key}
                    onChange={(e) => {
                      const newDetails = [...values.product_details];
                      newDetails[index].key = e.target.value;
                      setFieldValue('product_details', newDetails);
                    }}
                  />
                  {touched.product_details?.[index] && errors.product_details && (errors.product_details?.[index] as any)?.key && (
                    <p className="text-xs text-red-500">{(errors.product_details[index] as any).key}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    className={inputClass}
                    placeholder="Value (e.g. Aluminum)"
                    value={detail.value}
                    onChange={(e) => {
                      const newDetails = [...values.product_details];
                      newDetails[index].value = e.target.value;
                      setFieldValue('product_details', newDetails);
                    }}
                  />
                  {touched.product_details?.[index] && errors.product_details && (errors.product_details?.[index] as any)?.value && (
                    <p className="text-xs text-red-500">{(errors.product_details[index] as any).value}</p>
                  )}
                </div>
                <button
                  onClick={() =>
                    setFieldValue(
                      'product_details',
                      values.product_details.filter((_: Record<string, string>, i: number) => i !== index)
                    )
                  }
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400 hover:bg-red-50 transition-all text-lg leading-none self-start mt-0"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFieldValue('product_details', [...values.product_details, { key: '', value: '' }])}
              className="text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1 mt-1 transition-colors"
            >
              + Add detail
            </button>
          </SectionCard>

          {/* Visibility & Status */}
          <SectionCard title="Visibility & Status">
            {[
              { label: 'Active', desc: 'Product is visible on the storefront', defaultOn: values.active, handleChange: (value: boolean) => setFieldValue('active', value) },
              { label: 'In stock', desc: 'Product can be added to cart', defaultOn: values.in_stock, handleChange: (value: boolean) => setFieldValue('in_stock', value) },
              { label: 'Featured', desc: 'Highlighted on homepage or featured sections', defaultOn: values.is_featured, handleChange: (value: boolean) => setFieldValue('is_featured', value) },
              { label: 'New arrival', desc: 'Shows "New" badge on product listing', defaultOn: values.is_new_arrival, handleChange: (value: boolean) => setFieldValue('is_new_arrival', value) },
            ].map((item, i, arr) => (
              <div key={item.label} className={`flex items-center justify-between py-3.5 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
                <div
                  onClick={() => item.handleChange(!item.defaultOn)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 cursor-pointer ${item.defaultOn ? 'bg-emerald-500 border-emerald-500' : 'bg-gray-200 border-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${item.defaultOn ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
          </SectionCard>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-2 mb-10">
            <button type="button" className="px-5 py-2.5 text-sm rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              Reset
            </button>
            <button type="submit" className="px-7 py-2.5 text-sm rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-sm">
              Save product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
