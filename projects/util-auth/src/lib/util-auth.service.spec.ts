import { TestBed } from '@angular/core/testing';

import { UtilAuthService } from './util-auth.service';

describe('UtilAuthService', () => {
  let service: UtilAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
