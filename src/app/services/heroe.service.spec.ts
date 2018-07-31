import { TestBed, inject } from '@angular/core/testing';

import { HeroeService } from './heroe.service';

describe('HeroeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroeService]
    });
  });

  it('should be created', inject([HeroeService], (service: HeroeService) => {
    expect(service).toBeTruthy();
  }));
});
