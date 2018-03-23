import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBlogEmailComponent } from './dialog-blog-email.component';

describe('DialogBlogEmailComponent', () => {
  let component: DialogBlogEmailComponent;
  let fixture: ComponentFixture<DialogBlogEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBlogEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBlogEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
