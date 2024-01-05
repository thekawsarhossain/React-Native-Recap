export interface ProductState {
    status: string;
    products: Product[];
}

export interface RootState {
    products: ProductState;
}

export interface ProductImage {
    id: number;
    product_id: number;
    image_url: string;
}

export interface IncludedProduct {
    id: number;
    product_id: number;
    name: string;
    amount: number;
    created_at: Date
    updated_at: Date
}

export interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    features: string;
    price: number;
    created_at: Date;
    updated_at: Date;
    is_featured?: any;
    featured_image: string;
    images: ProductImage[];
    included: IncludedProduct[]
}