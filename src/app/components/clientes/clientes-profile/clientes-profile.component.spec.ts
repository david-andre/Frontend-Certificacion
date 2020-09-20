import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesProfileComponent } from './clientes-profile.component';

describe('ClientesProfileComponent', () => {
  let component: ClientesProfileComponent;
  let fixture: ComponentFixture<ClientesProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
