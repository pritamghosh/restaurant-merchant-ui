import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { OrderItem, Order } from "../models/order.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AlertService } from "./alert.service";
import { BusyDisplayService } from "./busy-display.service";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  resetSubject = new Subject();
  addMenuSubject = new Subject<OrderItem>();

  orderItemMap: Map<string, OrderItem> = new Map();

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private busyDisplayService: BusyDisplayService,
    private loginService: LoginService
  ) {
    this.addMenuSubject.subscribe(val => {
      let item = this.orderItemMap.get(val.menuItem.name);
      this.orderItemMap.set(val.menuItem.name, val);
    });
  }

  placeOrder(order: Order) {
    order.restaurantUsername = this.loginService.getUser().username;
    console.log(order);

    this.http
      .post(`${environment.api}/order`, order, { responseType: "text" })
      .subscribe((resp: any) => {
        this.busyDisplayService.showBusyDisplay(false);
        this.alertService.openDiaolog(resp, "/");
      });
  }
}
