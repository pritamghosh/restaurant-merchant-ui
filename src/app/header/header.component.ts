import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoginService } from "../services/login.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  name = "";
  subs: Subscription;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.subs = this.loginService.isLoggedInSubject
      .asObservable()
      .subscribe(resp => {
        this.isLoggedIn = resp;
        if (this.isLoggedIn) {
          this.name = this.loginService.getUser()?.restaurantName;
        }
      });
  }

  signOut() {
    this.loginService.signOut();
    this.router.navigateByUrl("/login");
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
