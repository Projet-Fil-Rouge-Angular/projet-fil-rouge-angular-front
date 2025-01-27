import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

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
