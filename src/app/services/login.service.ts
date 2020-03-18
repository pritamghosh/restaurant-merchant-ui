const LOGIN_INFO_KEY = "loginInfo-restaurant-merchant";
import { Injectable } from "@angular/core";
import { Subject, from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import { BusyDisplayComponent } from "../busy-display/busy-display.component";
import { BusyDisplayService } from "./busy-display.service";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  isLoggedInSubject = new Subject<boolean>();
  balanceSubject = new Subject<number>();
  constructor(
    private http: HttpClient,
    private busyDisplayService: BusyDisplayService
  ) {}

  login(login: any): Promise<any> {
    this.signOut();
    this.busyDisplayService.showBusyDisplay(true);
    return new Promise(resolve => {
      this.http.post(`${environment.api}/login`, login).subscribe(resp => {
        this.savetoContext(resp);

        this.busyDisplayService.showBusyDisplay(false);
        resolve(true);
      });
    });
  }

  public savetoContext(resp: any) {
    if (resp != null) {
      sessionStorage.setItem(LOGIN_INFO_KEY, JSON.stringify(resp));
      this.isLoggedInSubject.next(true);
    }
  }
  isLoggedIn(): boolean {
    let resp = sessionStorage.getItem(LOGIN_INFO_KEY);
    return resp != null;
  }

  public clearContext() {
    sessionStorage.removeItem(LOGIN_INFO_KEY);
    this.isLoggedInSubject.next(false);
  }
  public signOut() {
    this.clearContext();
  }

  getUser(): User {
    sessionStorage.getItem(LOGIN_INFO_KEY);
    let resp = sessionStorage.getItem(LOGIN_INFO_KEY);
    if (resp != null) {
      return JSON.parse(resp);
    }
    return null;
  }
}
