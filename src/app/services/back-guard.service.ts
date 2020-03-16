import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root"
})
export class BackGuardService implements CanDeactivate<any> {
  constructor(private loginService: LoginService) {}

  canDeactivate(
    component: any,
    currentRoute: import("@angular/router").ActivatedRouteSnapshot,
    currentState: import("@angular/router").RouterStateSnapshot,
    nextState?: import("@angular/router").RouterStateSnapshot
  ) {
    return nextState.url == "/login" && !this.loginService.isLoggedIn();
  }
}
