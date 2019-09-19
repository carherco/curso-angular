import { TestBed } from '@angular/core/testing';

import { MylibService } from './mylib.service';

describe('MylibService', () => {
  let service: MylibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MylibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
