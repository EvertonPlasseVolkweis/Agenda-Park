import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAceitaComponent } from './modal-aceita.component';

describe('ModalAceitaComponent', () => {
  let component: ModalAceitaComponent;
  let fixture: ComponentFixture<ModalAceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAceitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
