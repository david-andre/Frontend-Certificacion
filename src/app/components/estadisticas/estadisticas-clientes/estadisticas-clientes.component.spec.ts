import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasClientesComponent } from './estadisticas-clientes.component';

describe('EstadisticasClientesComponent', () => {
  let component: EstadisticasClientesComponent;
  let fixture: ComponentFixture<EstadisticasClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
