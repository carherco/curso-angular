import { TestBed, inject } from '@angular/core/testing';

import { MockHeroeService } from './mock-heroe.service';

describe('MockHeroeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockHeroeService]
    });
  });

  it('should be created', inject([MockHeroeService], (service: MockHeroeService) => {
    expect(service).toBeTruthy();
  }));
});
