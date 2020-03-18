import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { OrderItem, Order } from "../models/order.model";
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
  @Output() back: EventEmitter<any> = new EventEmitter();
  items: OrderItem[] = [];
  email: string = "";
  constructor(
    private service: OrderService,
    public dialog: MatDialog,
    private busyDisplayService: BusyDisplayService
  ) {}

  ngOnInit(): void {
    this.service.orderItemMap.forEach(element => {
      this.items.push(element);
    });
    this.service.orderItemMap;
  }

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
        order.orderItems = [];
        for (let val of this.service.orderItemMap.values()) {
          if (val.qty > 0) {
            order.orderItems.push(val);
          }
        }
        this.service.orderItemMap.values();
        this.service.placeOrder(order);
      }
    });
  }
  get payDisable() {
    if (this.email.length < 1) {
      return true;
    }
    for (let val of this.service.orderItemMap.values()) {
      if (val.qty > 0) {
        return false;
      }
    }
    return true;
  }
  onBack() {
    this.back.emit(null);
  }
  submit() {
    this.openFaceIdDialog();
  }
}
