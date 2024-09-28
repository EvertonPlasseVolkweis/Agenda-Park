import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoriosListaComponent } from './laboratorios-lista.component';

describe('LaboratoriosListaComponent', () => {
  let component: LaboratoriosListaComponent;
  let fixture: ComponentFixture<LaboratoriosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoriosListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoriosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
