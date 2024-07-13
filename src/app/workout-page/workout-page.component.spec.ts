import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPageComponent } from './workout-page.component';

describe('WorkoutPageComponent', () => {
  let component: WorkoutPageComponent;
  let fixture: ComponentFixture<WorkoutPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutPageComponent]
    });
    fixture = TestBed.createComponent(WorkoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
