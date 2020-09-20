import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosServiciosComponent } from './pedidos-servicios.component';

describe('PedidosServiciosComponent', () => {
  let component: PedidosServiciosComponent;
  let fixture: ComponentFixture<PedidosServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
