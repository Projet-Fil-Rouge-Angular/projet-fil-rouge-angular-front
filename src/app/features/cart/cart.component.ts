import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CoursesService } from '../../core/services/courses/courses.service';
import { Course } from '../../core/models/courses/course.model';
import { DatePipe } from '@angular/common';

/**
 * Composant permettant la gestion du panier et l'achat des cours.
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false,
  styleUrls: ['./cart.component.css'],
  providers: [DatePipe],
})
export class CartComponent implements OnInit {
  panier: any = null;
  coursMap: { [key: number]: Course } = {};
  afficherModale = false;
  resumeAchat: Course[] = [];
  messageNotification: string = '';
  afficherNotification: boolean = false;

  constructor(
    private servicePanier: CartService,
    private serviceCours: CoursesService,
    private formatteurDate: DatePipe
  ) {}

  /**
   * Initialise le composant et charge le contenu du panier.
   */
  ngOnInit() {
    this.chargerPanier();
  }

  /**
   * Charge les informations du panier depuis le service.
   */
  chargerPanier() {
    this.servicePanier.getCart().subscribe((reponsePanier) => {
      this.panier = reponsePanier;
      this.chargerDetailsCours();
    });
  }

  /**
   * Charge les détails des cours disponibles et les stocke dans un objet de correspondance.
   */
  chargerDetailsCours() {
    this.serviceCours.getCourses().subscribe((reponse: any) => {
      if (reponse && Array.isArray(reponse.data)) {
        this.coursMap = {};
        reponse.data.forEach((cours: Course) => {
          this.coursMap[cours.id] = cours;
        });
      } else {
        console.error('Les cours récupérés ne sont pas un tableau :', reponse);
      }
    });
  }

  /**
   * Supprime un cours du panier.
   * @param idCours Identifiant du cours à supprimer du panier.
   */
  retirerDuPanier(idCours: number) {
    this.servicePanier.removeCourseFromCart(idCours).subscribe(() => {
      this.chargerPanier();
    });
  }

  /**
   * Prépare un résumé des cours avant la confirmation d'achat.
   */
  preparerResumeAchat() {
    this.resumeAchat = this.panier.courses.map(
      (item: { courseId: number }) => this.coursMap[item.courseId]
    );
    this.afficherModale = true;
  }

  /**
   * Confirme l'achat des cours présents dans le panier et vide le panier.
   */
  confirmerAchat() {
    this.servicePanier.clearCart().subscribe(() => {
      this.afficherModale = false;
      this.panier = { courses: [] };
      this.messageNotification = 'Achat confirmé !';
      this.afficherNotification = true;

      setTimeout(() => {
        this.afficherNotification = false;
      }, 3000);
    });
  }

  /**
   * Ferme la fenêtre modale de confirmation d'achat.
   */
  fermerModale() {
    this.afficherModale = false;
  }

  /**
   * Formate une date en format court.
   * @param horaire Chaîne représentant la date et l'heure à formater.
   * @returns La date formatée sous forme de chaîne.
   */
  formaterHoraire(horaire: string): string {
    return this.formatteurDate.transform(horaire, 'short') || '';
  }

  /**
   * Calcule le prix total des cours présents dans le panier.
   * @returns Le prix total des cours sélectionnés.
   */
  calculerPrixTotal(): number {
    return this.panier.courses.reduce((total: number, item: { courseId: number }) => {
      const cours = this.coursMap[item.courseId];
      return total + cours.price;
    }, 0);
  }
}
