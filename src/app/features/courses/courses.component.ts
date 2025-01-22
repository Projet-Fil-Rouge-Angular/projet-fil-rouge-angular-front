import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../core/services/courses/courses.service';
import { Course } from '../../core/models/courses/course.model';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.courses = response.data;
      }
    });
  }
}
