import { Component, OnInit } from "@angular/core";
import { MenuGroup, Menu } from "../models/restaurant.model";
import { LoginService } from "../services/login.service";
import { OrderService } from "../services/order.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  menuGruops: MenuGroup[];

  review = false;
  constructor(
    private loginService: LoginService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.menuGruops = this.loginService.getUser()?.menuGruop;
    this.orderService.successfullSubject
      .asObservable()
      .subscribe(() => this.reset());
  }

  completeOrder() {
    this.review = true;
  }
  reset() {
    this.review = false;
    this.orderService.resetSubject.next(true);
    this.orderService.orderItemMap = new Map();
  }

  get isEmptyCart() {
    for (let val of this.orderService.orderItemMap.values()) {
      if (val.qty > 0) {
        return false;
      }
    }
    return true;
  }
}
