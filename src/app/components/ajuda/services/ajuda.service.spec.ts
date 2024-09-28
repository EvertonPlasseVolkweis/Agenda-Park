import { TestBed } from '@angular/core/testing';

import { AjudaService } from './ajuda.service';

describe('AjudaService', () => {
  let service: AjudaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjudaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
