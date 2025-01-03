export type Product = {
    _id: string;
    name: string;
    category: string;
    subcategory: string;
    specifications: string[];
    brand: string;
    color: string;
    weight: number;
    price: number;
    stock: number;
    measuringUnit: string;
    description: string;
    images: string[];
    dimensions: string;
    code: string;
    bulkDiscountminQuantity: number;
    bulkDiscount: number;
    discount: number;
  };