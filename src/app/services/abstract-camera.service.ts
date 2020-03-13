import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { DesktopCameraService } from "./desktop-camera.service";
import { PlatformInformationProvider } from "./platform-information.provider";
import { MobileCameraService } from "./mobile-camera.service";

export function cameraFactory(
  platformInformationProvider: PlatformInformationProvider
): AbstractCameraService {
  if (platformInformationProvider.isMobileDevice) {
    return new MobileCameraService();
  }

  return new DesktopCameraService();
}
interface ICameraService {
  getPhoto(): Observable<string>;
}
@Injectable({
  providedIn: "root"
})
export abstract class AbstractCameraService implements ICameraService {
  abstract getPhoto(): Observable<string>;

  abstract show(): void;
}
