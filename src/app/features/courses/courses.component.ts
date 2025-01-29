import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../core/services/courses/courses.service';
import { Course } from '../../core/models/courses/course.model';

/**
 * Composant gérant l'affichage et la recherche des cours.
 */
@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  cours: Course[] = [];
  coursFiltres: Course[] = [];
  recherche: string = '';
  messageNotification = '';
  afficherNotification = false;

  constructor(private serviceCours: CoursesService) {}

  /**
   * Initialisation du composant : chargement des cours.
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
        this.coursFiltres = reponse.data;
      }
    });
  }

  /**
   * Filtre les cours en fonction du texte entré dans le champ de recherche.
   */
  filtrerCours() {
    const termeRecherche = this.recherche.toLowerCase().trim();

    this.coursFiltres = this.cours.filter((cours) =>
      Object.values(cours).some((valeur) =>
        valeur.toString().toLowerCase().includes(termeRecherche)
      )
    );
  }

  /**
   * Affiche une notification avec un message personnalisé.
   * @param message Contenu du message à afficher.
   */
  afficherMessageNotification(message: string) {
    this.messageNotification = message;
    this.afficherNotification = true;

    setTimeout(() => {
      this.afficherNotification = false;
    }, 3000);
  }
}
