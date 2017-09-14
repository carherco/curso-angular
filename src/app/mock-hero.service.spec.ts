import { TestBed, inject } from '@angular/core/testing';

import { MockHeroService } from './mock-hero.service';

describe('MockHeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockHeroService]
    });
  });

  it('should be created', inject([MockHeroService], (service: MockHeroService) => {
    expect(service).toBeTruthy();
  }));
});
