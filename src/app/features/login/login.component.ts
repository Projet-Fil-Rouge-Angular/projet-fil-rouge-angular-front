import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

/**
 * Composant de gestion de l'authentification des utilisateurs.
 * Permet aux utilisateurs de se connecter et de rediriger selon leur rôle.
 */
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Vérifie la validité du token lors de l'initialisation du composant.
   * Si le token est valide, redirige l'utilisateur vers son tableau de bord.
   */
  ngOnInit(): void {
    this.authService.validateToken().subscribe({
      next: (isValid) => {
        if (isValid) {
          this.router.navigate(['/admin-dashboard']);
        }
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  /**
   * Tente de connecter l'utilisateur avec les informations fournies.
   * Redirige vers le tableau de bord admin si l'utilisateur est un administrateur,
   * sinon redirige vers la page d'accueil.
   */
  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (_) => {
        const userRole = this.authService.getUserRole();

        if (userRole === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (userRole === 'User') {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.errorMessage = "Nom d'utilisateur ou mot de passe invalide";
      },
    });
  }
}
