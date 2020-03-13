import { Injectable } from "@angular/core";
import { AbstractCameraService } from "./abstract-camera.service";
import { Observer, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MobileCameraService implements AbstractCameraService {
  getPhoto(): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      const removeDomListener = () => {
        document.removeEventListener("deviceready", onCordovaDeviceReady);
      };

      const onCordovaDeviceReady = () => {
        const camera = null; //window.navigator.camera;

        const options = {
          quality: 100,
          destinationType: camera.DestinationType.DATA_URL,
          sourceType: camera.PictureSourceType.CAMERA,
          encodingType: camera.EncodingType.PNG,
          pictureSourceType: camera.PictureSourceType.CAMERA,
          saveToPhotoAlbum: false,
          targetWidth: 640,
          targetHeight: 640,
          correctOrientation: true
        };

        camera.getPicture(
          (imageData: any) => {
            observer.next("data:image/png;base64," + imageData);
            removeDomListener();
            observer.complete();
          },
          (error: any) => {
            observer.error(error);
            removeDomListener();
            observer.complete();
          },
          options
        );
      };

      document.addEventListener("deviceready", onCordovaDeviceReady);
    });
  }

  show() {}
}
