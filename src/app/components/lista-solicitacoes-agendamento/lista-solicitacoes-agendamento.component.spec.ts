import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSolicitacoesAgendamentoComponent } from './lista-solicitacoes-agendamento.component';

describe('ListaSolicitacoesAgendamentoComponent', () => {
  let component: ListaSolicitacoesAgendamentoComponent;
  let fixture: ComponentFixture<ListaSolicitacoesAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSolicitacoesAgendamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSolicitacoesAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
