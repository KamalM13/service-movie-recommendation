export interface CartItem {
    _id: string;
    productId: {
      _id: string;
      name: string;
      category: string;
      price: number;
      images: string[];
      stock: number;
      totalPrice: number;
      discount: number;
      bulkDiscount: number;
      bulkDiscountminQuantity: number;
    };
    quantity: number;
  }