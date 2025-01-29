import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Intercepteur HTTP pour ajouter automatiquement le token d'authentification
 * à toutes les requêtes HTTP sortantes.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * Intercepte les requêtes HTTP sortantes et y ajoute le token d'authentification si disponible.
   * @param request Requête HTTP sortante.
   * @param next Gestionnaire de la requête HTTP.
   * @returns Observable contenant l'événement HTTP après l'interception.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
