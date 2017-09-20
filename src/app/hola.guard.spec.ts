import { TestBed, async, inject } from '@angular/core/testing';

import { HolaGuard } from './hola.guard';

describe('HolaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HolaGuard]
    });
  });

  it('should ...', inject([HolaGuard], (guard: HolaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
