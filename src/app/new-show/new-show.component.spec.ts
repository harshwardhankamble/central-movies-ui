import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShowComponent } from './new-show.component';

describe('NewShowComponent', () => {
  let component: NewShowComponent;
  let fixture: ComponentFixture<NewShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewShowComponent]
    });
    fixture = TestBed.createComponent(NewShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
