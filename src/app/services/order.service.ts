import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { OrderItem, Order } from "../models/order.model";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  resetSubject = new Subject();
  addMenuSubject = new Subject<OrderItem>();

  orderItemMap: Map<string, OrderItem> = new Map();

  constructor(private router: Router, private http: HttpClient) {
    this.addMenuSubject.subscribe(val => {
      let item = this.orderItemMap.get(val.menuItem.name);
      this.orderItemMap.set(val.menuItem.name, val);
    });
  }

  completeOrder() {
    this.router.navigate(["/review"]);
  }

  placeOrder(order: Order) {
    console.log(order);
    this.http
      .post(`${environment.api}/order`, order)
      .subscribe(resp => console.log(resp));
  }
}
