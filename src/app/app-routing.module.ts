import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReviewComponent } from "./review/review.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", canActivate: [AuthGuardService], component: HomeComponent },
  {
    path: "review",
    canActivate: [AuthGuardService],
    component: ReviewComponent
  },

  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
