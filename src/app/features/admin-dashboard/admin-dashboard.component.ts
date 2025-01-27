import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../core/services/courses/courses.service';
import { Course } from '../../core/models/courses/course.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  courses: Course[] = [];
  errorMessage = '';
  selectedCourse: Course | null = null;
  showModal = false;
  modalTitle = '';

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private authService: AuthService
  ) {}

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

  deleteCourse(id: number): void {
    this.coursesService.deleteCourse(id.toString()).subscribe({
      next: () => {
        this.loadCourses();
      },
      error: () => {
        this.errorMessage = 'Failed to delete course.';
      },
    });
  }

  addCourse(): void {
    this.selectedCourse = null;
    this.modalTitle = 'Ajouter un cours';
    this.showModal = true;
  }

  editCourse(course: Course): void {
    this.selectedCourse = course;
    this.modalTitle = 'Modifier un cours';
    this.showModal = true;
  }

  saveCourse(course: Course): void {
    if (this.selectedCourse) {
      this.coursesService.updateCourse(course.id.toString(), course).subscribe({
        next: () => {
          this.loadCourses();
          this.closeModal();
        },
        error: () => console.error('Failed to update course'),
      });
    } else {
      console.log(course);
      this.coursesService.addCourse(course).subscribe({
        next: () => {
          this.loadCourses();
          this.closeModal();
        },
        error: () => console.error('Failed to add course'),
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCourse = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
