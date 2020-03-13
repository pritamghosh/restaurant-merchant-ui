import { TestBed } from '@angular/core/testing';

import { MobileCameraService } from './mobile-camera.service';

describe('MobileCameraService', () => {
  let service: MobileCameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileCameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
