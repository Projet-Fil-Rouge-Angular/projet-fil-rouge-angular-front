import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailedComponent } from './course-detailed.component';

describe('CourseDetailedComponent', () => {
  let component: CourseDetailedComponent;
  let fixture: ComponentFixture<CourseDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseDetailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
