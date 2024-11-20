import { TestBed } from '@angular/core/testing';

import { tokenserviceService } from './tokenservice.service';

describe('TokenServiceService', () => {
  let service: tokenserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(tokenserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
