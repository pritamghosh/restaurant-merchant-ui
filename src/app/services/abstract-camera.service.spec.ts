import { TestBed } from '@angular/core/testing';

import { AbstractCameraService } from './abstract-camera.service';

describe('AbstractCameraService', () => {
  let service: AbstractCameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractCameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
