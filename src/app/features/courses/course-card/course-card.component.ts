import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Course } from '../../../core/models/courses/course.model';
import { CartService } from '../../../core/services/cart/cart.service';
import { AuthService } from '../../../core/services/auth/auth.service';

/**
 * Carte représentant un cours avec la possibilité de l'ajouter au panier.
 */
@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  standalone: false,
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;
  @Output() coursAjouteAuPanier = new EventEmitter<string>();
  utilisateurConnecte = false;

  constructor(
    private servicePanier: CartService,
    private serviceAuth: AuthService
  ) {}

  /**
   * Vérifie si l'utilisateur est connecté à l'initialisation du composant.
   */
  ngOnInit(): void {
    this.serviceAuth.authStatus$.subscribe((estConnecte) => {
      this.utilisateurConnecte = estConnecte;
    });
  }

  /**
   * Ajoute le cours au panier et gère les erreurs éventuelles.
   */
  ajouterAuPanier(): void {
    const horaire = new Date().toISOString();

    this.servicePanier.addCourseToCart(this.course.id, horaire).subscribe(
      () => {
        this.coursAjouteAuPanier.emit('Cours ajouté au panier !');
      },
      (erreur) => {
        if (erreur.status === 400) {
          this.coursAjouteAuPanier.emit('Ce cours est déjà dans votre panier');
          const elementNotification = document.querySelector('.notification');
          if (elementNotification) {
            elementNotification.classList.add('error');
          }
        } else {
          this.coursAjouteAuPanier.emit("Erreur lors de l'ajout au panier");
        }
      }
    );
  }
}
