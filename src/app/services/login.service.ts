const LOGIN_INFO_KEY = "loginInfo-restaurant-merchant";
import { Injectable } from "@angular/core";
import { Subject, from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  isLoggedInSubject = new Subject<boolean>();
  balanceSubject = new Subject<number>();
  constructor(private http: HttpClient) {}

  login(login: any): Promise<any> {
    this.signOut();
    return new Promise(resolve => {
      this.http.post(`${environment.api}/login`, login).subscribe(resp => {
        this.savetoContext(resp);
        resolve(true);
      });
    });
  }

  public savetoContext(resp: any) {
    if (resp != null) {
      localStorage.setItem(LOGIN_INFO_KEY, JSON.stringify(resp));
      this.isLoggedInSubject.next(true);
    }
  }
  isLoggedIn(): boolean {
    let resp = localStorage.getItem(LOGIN_INFO_KEY);
    return resp != null;
  }

  public clearContext() {
    localStorage.removeItem(LOGIN_INFO_KEY);
    this.isLoggedInSubject.next(false);
  }
  public signOut() {
    this.clearContext();
  }

  getUser(): User {
    localStorage.getItem(LOGIN_INFO_KEY);
    let resp = localStorage.getItem(LOGIN_INFO_KEY);
    if (resp != null) {
      return JSON.parse(resp);
    }
    return null;
  }
}
