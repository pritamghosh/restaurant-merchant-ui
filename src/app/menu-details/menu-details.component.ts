import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { OrderService } from "../services/order.service";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../models/restaurant.model";
import { OrderItem } from "../models/order.model";
@Component({
  selector: "app-menu-details",
  templateUrl: "./menu-details.component.html",
  styleUrls: ["./menu-details.component.scss"]
})
export class MenuDetailsComponent implements OnInit {
  @Input() menu: Menu;
  icon = faCoins;
  @Input() review: boolean = false;
  @Input() qty: number = 0;
  resetSubscription: Subscription;
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.resetSubscription = this.orderService.resetSubject
      .asObservable()
      .subscribe(val => this.reset());
    let item = this.orderService.orderItemMap.get(this.menu.name);

    this.qty = item != null ? item.qty : 0;
  }
  ngOnDestroy() {
    this.resetSubscription.unsubscribe();
  }
  get price() {
    return this.review ? this.qty * this.menu.price : this.menu.price;
  }
  add() {
    this.qty = +this.qty + 1;
    this.upadte();
  }
  minus() {
    this.qty = +this.qty - 1;
    this.upadte();
  }
  reset() {
    this.qty = 0;
    this.upadte();
  }
  upadte() {
    let orderItem = new OrderItem();
    orderItem.qty = this.qty;
    orderItem.menuItem = this.menu;
    this.orderService.addMenuSubject.next(orderItem);
  }
}
