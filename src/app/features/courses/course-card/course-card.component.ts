import { Component, Input } from '@angular/core';
import { Course } from '../../../core/models/courses/course.model';

@Component({
  selector: 'app-course-card',
  standalone: false,
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course!: Course;
}
