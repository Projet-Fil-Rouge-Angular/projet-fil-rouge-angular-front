import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../core/services/courses/courses.service';
import { Course } from '../../core/models/courses/course.model';

/**
 * Composant représentant le tableau de bord administrateur,
 * permettant la gestion des cours (ajout, suppression, modification).
 */
@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  cours: Course[] = [];
  messageErreur = '';
  coursSelectionne: Course | null = null;
  afficherModale = false;
  titreModale = '';

  constructor(
    private serviceCours: CoursesService,
  ) {}

  /**
   * Initialise le composant en chargeant les cours disponibles.
   */
  ngOnInit() {
    this.chargerCours();
  }

  /**
   * Charge la liste des cours depuis le service.
   */
  chargerCours() {
    this.serviceCours.getCourses().subscribe((reponse: any) => {
      if (reponse.statusCode === 200) {
        this.cours = reponse.data;
      }
    });
  }

  /**
   * Supprime un cours en fonction de son identifiant.
   * @param idCours Identifiant du cours à supprimer.
   */
  supprimerCours(idCours: number): void {
    this.serviceCours.deleteCourse(idCours.toString()).subscribe({
      next: () => {
        this.chargerCours();
      },
      error: () => {
        this.messageErreur = 'Échec de la suppression du cours.';
      },
    });
  }

  /**
   * Affiche la fenêtre modale pour ajouter un nouveau cours.
   */
  ajouterCours(): void {
    this.coursSelectionne = null;
    this.titreModale = 'Ajouter un cours';
    this.afficherModale = true;
  }

  /**
   * Affiche la fenêtre modale pour modifier un cours existant.
   * @param cours Cours à modifier.
   */
  modifierCours(cours: Course): void {
    this.coursSelectionne = cours;
    this.titreModale = 'Modifier un cours';
    this.afficherModale = true;
  }

  /**
   * Enregistre un cours (ajout ou modification).
   * @param cours Données du cours à enregistrer.
   */
  enregistrerCours(cours: Course): void {
    if (!cours) return; // Vérification pour éviter les erreurs

    if (this.coursSelectionne) {
      this.serviceCours.updateCourse(cours.id.toString(), cours).subscribe({
        next: () => {
          this.chargerCours();
          this.fermerModale();
        },
        error: () => console.error('Échec de la mise à jour du cours'),
      });
    } else {
      this.serviceCours.addCourse(cours).subscribe({
        next: () => {
          this.chargerCours();
          this.fermerModale();
        },
        error: () => console.error("Échec de l'ajout du cours"),
      });
    }
  }

  /**
   * Ferme la fenêtre modale et réinitialise le cours sélectionné.
   */
  fermerModale(): void {
    this.afficherModale = false;
    this.coursSelectionne = null;
  }
}
