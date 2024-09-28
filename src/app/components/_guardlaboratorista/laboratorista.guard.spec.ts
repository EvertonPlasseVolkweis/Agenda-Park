import { TestBed } from '@angular/core/testing';

import { LaboratoristaGuard } from './laboratorista.guard';

describe('LaboratoristaGuard', () => {
  let guard: LaboratoristaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LaboratoristaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
