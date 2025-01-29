import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

/**
 * Composant représentant l'en-tête de l'application.
 * Il gère l'affichage de la navigation en fonction de l'état de connexion de l'utilisateur.
 */
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  estConnecte: boolean = false;
  roleUtilisateur: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Initialise le composant en souscrivant aux changements d'état d'authentification.
   */
  ngOnInit(): void {
    this.authService.authStatus$.subscribe((estConnecte) => {
      this.estConnecte = estConnecte;
      this.roleUtilisateur = this.authService.getUserRole();
    });
  }

  /**
   * Déconnecte l'utilisateur et le redirige vers la page d'accueil.
   */
  seDeconnecter(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
