import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaConsultaComponent } from './conta-consulta.component';

describe('ContaConsultaComponent', () => {
  let component: ContaConsultaComponent;
  let fixture: ComponentFixture<ContaConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
