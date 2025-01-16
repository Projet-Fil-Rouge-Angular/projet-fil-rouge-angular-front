import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log(this.apiUrl)
  }

  getCourses() {
    return this.http.get(`${this.apiUrl}/courses`);
  }

  getCourse(id: number) {
    return this.http.get(`${this.apiUrl}/courses/${id}`);
  }

  addCourse(course: any) {
    return this.http.post(`${this.apiUrl}/courses`, course);
  }

  deleteCourse(id: string) {
    return this.http.delete(`${this.apiUrl}/courses/${id}`);
  }
}
