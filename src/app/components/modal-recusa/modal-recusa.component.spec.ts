import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecusaComponent } from './modal-recusa.component';

describe('ModalRecusaComponent', () => {
  let component: ModalRecusaComponent;
  let fixture: ComponentFixture<ModalRecusaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRecusaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecusaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
