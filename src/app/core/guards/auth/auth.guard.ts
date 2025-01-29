import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Garde d'authentification pour protéger les routes et vérifier les rôles des utilisateurs.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Vérifie si l'utilisateur est autorisé à accéder à la route demandée.
   * @param route Route activée contenant les éventuelles données de rôle requises.
   * @returns Un `Observable<boolean>` indiquant si l'accès est autorisé (`true`) ou refusé (`false`).
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.validateToken().pipe(
      map((isValid) => {
        if (isValid) {
          const userRole = this.authService.getUserRole();
          const requiredRole = route.data['role'];

          if (!requiredRole || userRole === requiredRole) {
            return true;
          }

          this.router.navigate(['/']);
          return false;
        }

        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
