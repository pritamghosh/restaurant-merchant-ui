import { Component, OnInit } from "@angular/core";
import { OrderItem, Order } from "../models/order.model";
import { Subject } from "rxjs";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { FaceComponent } from "../face/face.component";
import { OrderService } from "../services/order.service";
import { BusyDisplayService } from "../services/busy-display.service";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"]
})
export class ReviewComponent implements OnInit {
  items: OrderItem[] = [];
  email: string;
  constructor(
    private service: OrderService,
    public dialog: MatDialog,
    private busyDisplayService: BusyDisplayService
  ) {}

  ngOnInit(): void {}

  openFaceIdDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      faceId: "",
      buttonName: "Pay & Finish"
    };

    const dialogRef = this.dialog.open(FaceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      if (!dialogConfig.data.cancelled && dialogConfig.data.faceId != null) {
        this.busyDisplayService.showBusyDisplay(true);
        let order = new Order();
        order.email = this.email;
        order.faceId = dialogConfig.data.faceId;
        order.orderItems = this.items;
        this.service.placeOrder(order);
      }
    });
  }

  onSubmit() {
    this.openFaceIdDialog();
  }
}
