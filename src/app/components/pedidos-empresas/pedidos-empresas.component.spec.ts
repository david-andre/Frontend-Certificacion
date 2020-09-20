import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosEmpresasComponent } from './pedidos-empresas.component';

describe('PedidosEmpresasComponent', () => {
  let component: PedidosEmpresasComponent;
  let fixture: ComponentFixture<PedidosEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
