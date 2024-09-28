import { TestBed } from '@angular/core/testing';

import { PublicoGuard } from './publico.guard';

describe('PublicoGuard', () => {
  let guard: PublicoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PublicoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
