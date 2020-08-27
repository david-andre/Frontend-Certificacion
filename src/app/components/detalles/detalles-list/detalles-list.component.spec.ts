import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesListComponent } from './detalles-list.component';

describe('DetallesListComponent', () => {
  let component: DetallesListComponent;
  let fixture: ComponentFixture<DetallesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
