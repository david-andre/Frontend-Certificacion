import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAddComponent } from './pedido-add.component';

describe('PedidoAddComponent', () => {
  let component: PedidoAddComponent;
  let fixture: ComponentFixture<PedidoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
