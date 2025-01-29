import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/carts`);
  }

  addCourseToCart(courseId: number, schedule: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/carts/courses`, { courseId, schedule });
  }

  removeCourseFromCart(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carts/courses/${courseId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carts`);
  }
}
