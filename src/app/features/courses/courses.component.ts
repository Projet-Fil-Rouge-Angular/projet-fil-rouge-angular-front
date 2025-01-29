import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../core/services/courses/courses.service';
import { Course } from '../../core/models/courses/course.model';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchQuery: string = '';
  notificationMessage = '';
  showNotification = false;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.courses = response.data;
        this.filteredCourses = response.data;
      }
    });
  }

  filterCourses() {
    const query = this.searchQuery.toLowerCase().trim();

    this.filteredCourses = this.courses.filter(course => 
      Object.values(course).some(value =>
        value.toString().toLowerCase().includes(query)
      )
    );
  }

  addToCart(course: Course) {
    this.notificationMessage = `Le cours ${course.name} a été ajouté au panier !`;
    this.showNotification = true;
    setTimeout(() => this.showNotification = false, 3000);
  }
}
