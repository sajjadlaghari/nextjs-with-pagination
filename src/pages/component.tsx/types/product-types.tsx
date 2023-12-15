export interface Image {
  id: number;
  product_id: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  created_at: string;
  updated_at: string;
  images: Image[];
}
