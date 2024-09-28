import { TestBed } from '@angular/core/testing';

import { SolicitacoesAgendamentoService } from './solicitacoes-agendamento.service';

describe('SolicitacoesAgendamentoService', () => {
  let service: SolicitacoesAgendamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacoesAgendamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
