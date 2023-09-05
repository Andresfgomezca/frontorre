import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGenomaComponent } from './user-genoma.component';

describe('UserGenomaComponent', () => {
  let component: UserGenomaComponent;
  let fixture: ComponentFixture<UserGenomaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGenomaComponent]
    });
    fixture = TestBed.createComponent(UserGenomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
