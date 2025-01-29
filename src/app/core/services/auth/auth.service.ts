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

  /**
   * Effectue une requête de connexion et stocke le jeton d'authentification.
   * @param username Nom d'utilisateur de l'utilisateur.
   * @param password Mot de passe de l'utilisateur.
   * @returns Un `Observable` contenant la réponse de l'API.
   */
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

  /**
   * Vérifie si le jeton d'authentification est valide en appelant l'API.
   * @returns Un `Observable` retournant `true` si le jeton est valide, sinon `false`.
   */
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

  /**
   * Déconnecte l'utilisateur en supprimant le jeton du stockage local
   * et en mettant à jour le statut d'authentification.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authStatusSubject.next(false);
  }

  /**
   * Récupère le jeton d'authentification stocké.
   * @returns Le jeton sous forme de `string` ou `null` s'il n'existe pas.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Récupère le rôle de l'utilisateur à partir du jeton déchiffré.
   * @returns Le rôle de l'utilisateur (`string`) ou `null` s'il n'est pas défini.
   */
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.type || null;
  }

  /**
   * Vérifie si l'utilisateur est connecté en regardant si un jeton est présent.
   * @returns `true` si un jeton est stocké, sinon `false`.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
