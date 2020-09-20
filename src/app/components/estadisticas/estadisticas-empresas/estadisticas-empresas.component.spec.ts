import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasEmpresasComponent } from './estadisticas-empresas.component';

describe('EstadisticasEmpresasComponent', () => {
  let component: EstadisticasEmpresasComponent;
  let fixture: ComponentFixture<EstadisticasEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
