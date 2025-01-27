import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'authToken';
  private authStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      map((response: any) => {
        const token = response.access_token;
        if (token) {
          localStorage.setItem(this.tokenKey, token);
          this.authStatusSubject.next(true);
        }
        return response;
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return of(false);
    }
    return this.http.get(`${this.apiUrl}/validate-token`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authStatusSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.type || null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
