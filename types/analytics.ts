export interface CategoryStock {
  _id: string;
  totalStock: number;
}

export interface CategoryValue {
  _id: string;
  totalValue: number;
}

export interface LowStockProduct {
  _id: string;
  name: string;
  stock: number;
}
