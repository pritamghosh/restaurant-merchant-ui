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
    if (this.menuGruops == null) {
      this.menuGruops = [];
      let mg = new MenuGroup();
      mg.category = "Group 1";
      mg.menuList = [];
      let menu = new Menu();
      menu.name = "menu";
      menu.price = 100;
      mg.menuList.push(menu);
      mg.menuList.push(menu);
      mg.menuList.push(menu);
      mg.menuList.push(menu);
      this.menuGruops.push(mg);
      this.menuGruops.push(mg);
    }
  }

  completeOrder() {
    this.review = true;
  }
  reset() {
    this.orderService.resetSubject.next(true);
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
