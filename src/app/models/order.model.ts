import { Menu } from "./restaurant.model";

export class OrderItem {
  qty: number;
  menuItem: Menu;
}

export class Order {
  email: string;
  faceId: string;
  orderItems: OrderItem[];
}
