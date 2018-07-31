import { TestBed, async, inject } from '@angular/core/testing';

import { PruebaGuard } from './prueba.guard';

describe('PruebaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PruebaGuard]
    });
  });

  it('should ...', inject([PruebaGuard], (guard: PruebaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
