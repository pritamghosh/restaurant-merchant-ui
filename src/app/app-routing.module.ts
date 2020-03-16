import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReviewComponent } from "./review/review.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { BackGuardService } from "./services/back-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    canActivate: [AuthGuardService],
    canDeactivate: [BackGuardService],
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
