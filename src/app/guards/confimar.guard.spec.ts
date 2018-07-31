import { TestBed, async, inject } from '@angular/core/testing';

import { ConfimarGuard } from './confimar.guard';

describe('ConfimarGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfimarGuard]
    });
  });

  it('should ...', inject([ConfimarGuard], (guard: ConfimarGuard) => {
    expect(guard).toBeTruthy();
  }));
});
