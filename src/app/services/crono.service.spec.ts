import { TestBed, inject } from '@angular/core/testing';

import { CronoService } from './crono.service';

describe('CronoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CronoService]
    });
  });

  it('should be created', inject([CronoService], (service: CronoService) => {
    expect(service).toBeTruthy();
  }));
});
