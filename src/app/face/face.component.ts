import { Component, OnInit, Inject, Input } from "@angular/core";
import { Observable } from "rxjs";
import { FaceRecognitionService } from "../services/face-recognition.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { environment } from "../../environments/environment";
import { DesktopCameraService } from "../services/desktop-camera.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AbstractCameraService } from "../services/abstract-camera.service";
@Component({
  selector: "app-face",
  templateUrl: "./face.component.html",
  styleUrls: ["./face.component.scss"]
})
export class FaceComponent implements OnInit {
  message: string;
  imageString = "";
  faceApiResponse: Observable<any>;
  title: string = "Face Recognition";
  subscriptionKey = environment.subscriptionKey;
  isButtonVisible = true;
  model: any = {};
  errorMessage: string;

  userForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private faceRecognitionService: FaceRecognitionService,
    private cameraService: AbstractCameraService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FaceComponent>
  ) {}
  public ngOnInit(): void {
    this.cameraService.show();
  }
  get submitButtonName() {
    return this.data.buttonName;
  }
  onCancel() {
    this.stopCamera();
    this.data.cancelled = true;
    this.dialogRef.close();
  }
  stopCamera() {
    var video: any = document.querySelector("#videoElement");
    var stream = video.srcObject;
    if (stream != null) {
      var tracks = stream.getTracks();
      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
      }
    }

    video.srcObject = null;
  }
  processImage() {
    if (!this.subscriptionKey) {
      console.log("subscriptionKey Invalid");
      return;
    }

    this.cameraService.getPhoto().subscribe(base64Image => {
      this.stopCamera();

      this.imageString = base64Image;

      this.faceRecognitionService
        .scanImage(this.subscriptionKey, base64Image)
        .subscribe(
          resp => {
            if (resp != null && resp.length > 0) {
              this.data.faceId = resp[0].faceId;
              this.dialogRef.close();
            } else {
              console.log("empty resp");
              this.imageString = null;
              this.cameraService.show();
            }
          },
          err => {
            this.cameraService.show();
            this.imageString = null;
          }
        );
    });
  }
}
