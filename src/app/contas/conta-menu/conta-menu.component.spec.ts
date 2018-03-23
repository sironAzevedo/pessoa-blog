import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaMenuComponent } from './conta-menu.component';

describe('ContaMenuComponent', () => {
  let component: ContaMenuComponent;
  let fixture: ComponentFixture<ContaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
