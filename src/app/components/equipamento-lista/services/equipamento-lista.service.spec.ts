import { TestBed } from '@angular/core/testing';

import { EquipamentoListaService } from './equipamento-lista.service';

describe('EquipamentoListaService', () => {
  let service: EquipamentoListaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipamentoListaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
