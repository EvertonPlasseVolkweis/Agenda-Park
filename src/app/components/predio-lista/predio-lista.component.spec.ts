import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredioListaComponent } from './predio-lista.component';

describe('PredioListaComponent', () => {
  let component: PredioListaComponent;
  let fixture: ComponentFixture<PredioListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredioListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredioListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
