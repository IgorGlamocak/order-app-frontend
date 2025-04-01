export interface User {
  id: number;

  fullName: string;

  email: string;

  password: string;

  avatar?: string;

  orders: Order[];
}


export interface Order {
  id: number;

  user: User;

  service: Service;

  orderDate: Date;

  quantity: number;

  totalPrice: number;
}

export interface Service {
  id: number;

  serviceName: string;

  description: string;

  price: number;

  orders: Order[];
}


