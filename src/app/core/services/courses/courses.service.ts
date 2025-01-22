import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Course } from '../../models/courses/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);

  }

  getCourse(id: number) {
    return this.http.get(`${this.apiUrl}/courses/${id}`);
  }

  addCourse(course: any) {
    return this.http.post(`${this.apiUrl}/courses`, course);
  }

  updateCourse(id: string, course: any) {
    return this.http.patch(`${this.apiUrl}/courses/${id}`, course);
  }

  deleteCourse(id: string) {
    return this.http.delete(`${this.apiUrl}/courses/${id}`);
  }
}
