import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaCadastroComponent } from './conta-cadastro.component';

describe('ContaCadastroComponent', () => {
  let component: ContaCadastroComponent;
  let fixture: ComponentFixture<ContaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
