import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from "@angular/material/tabs";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDividerModule } from "@angular/material/divider";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDialogModule } from "@angular/material/dialog";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { ReviewComponent } from "./review/review.component";
import { MenuDetailsComponent } from "./menu-details/menu-details.component";
import { AlertComponent } from "./alert/alert.component";
import { FaceComponent } from "./face/face.component";
import { BusyDisplayComponent } from "./busy-display/busy-display.component";
import { ErrorService } from "./services/error.service";
import {
  AbstractCameraService,
  cameraFactory
} from "./services/abstract-camera.service";
import { PlatformInformationProvider } from "./services/platform-information.provider";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ReviewComponent,
    AlertComponent,
    MenuDetailsComponent,
    FaceComponent,
    BusyDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatGridListModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSliderModule,
    MatStepperModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorService },
    {
      provide: AbstractCameraService,
      useFactory: cameraFactory,
      deps: [PlatformInformationProvider]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
