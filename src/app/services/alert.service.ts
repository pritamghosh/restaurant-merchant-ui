import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AlertComponent } from "../alert/alert.component";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(private router: Router, private dialog: MatDialog) {}

  openDiaolog(msg: string, returnMethod?: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      msg: msg,
      buttonName: "Ok"
    };

    return this.dialog.open(AlertComponent, dialogConfig);
  }
}
