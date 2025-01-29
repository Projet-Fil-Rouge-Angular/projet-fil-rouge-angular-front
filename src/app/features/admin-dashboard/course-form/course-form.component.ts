import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Course } from '../../../core/models/courses/course.model';

/**
 * Composant permettant de gérer le formulaire d'ajout et de modification d'un cours.
 */
@Component({
  selector: 'app-course-form',
  standalone: false,
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent implements OnChanges {
  @Input() cours: Course | null = null;
  @Output() enregistrer = new EventEmitter<Course>();
  @Output() annuler = new EventEmitter<void>();

  donneesFormulaire: Course = {
    id: 0,
    name: '',
    description: '',
    duration: 0,
    contentMarkdown: '',
    imageUrl: '',
    level: '',
    prerequisites: [],
    tags: [],
    price: 0,
  };
  saisieTag = '';
  saisiePrerequis = '';

  /**
   * Met à jour les données du formulaire si un cours est sélectionné pour modification.
   */
  ngOnChanges(): void {
    if (this.cours) {
      this.donneesFormulaire = { ...this.cours };
    }
  }

  /**
   * Ajoute un tag à la liste des tags du cours.
   */
  ajouterTag(): void {
    if (this.saisieTag) {
      this.donneesFormulaire.tags.push(this.saisieTag);
      this.saisieTag = '';
    }
  }

  /**
   * Supprime un tag de la liste des tags du cours.
   * @param index Position du tag à supprimer.
   */
  supprimerTag(index: number): void {
    this.donneesFormulaire.tags.splice(index, 1);
  }

  /**
   * Ajoute un prérequis à la liste des prérequis du cours.
   */
  ajouterPrerequis(): void {
    if (this.saisiePrerequis) {
      this.donneesFormulaire.prerequisites.push(this.saisiePrerequis);
      this.saisiePrerequis = '';
    }
  }

  /**
   * Supprime un prérequis de la liste des prérequis du cours.
   * @param index Position du prérequis à supprimer.
   */
  supprimerPrerequis(index: number): void {
    this.donneesFormulaire.prerequisites.splice(index, 1);
  }

  /**
   * Vérifie si le formulaire est valide.
   * @returns `true` si le formulaire est valide, `false` sinon.
   */
  formulaireEstValide(): boolean {
    return (
      !!this.donneesFormulaire.name &&
      !!this.donneesFormulaire.description &&
      this.donneesFormulaire.duration >= 1 &&
      !!this.donneesFormulaire.contentMarkdown &&
      !!this.donneesFormulaire.imageUrl &&
      !!this.donneesFormulaire.level &&
      this.donneesFormulaire.prerequisites.length > 0 &&
      this.donneesFormulaire.tags.length > 0 &&
      this.donneesFormulaire.price >= 1
    );
  }

  /**
   * Soumet le formulaire et émet l'événement avec un objet `Course`.
   */
  onSubmit(): void {
    if (!this.formulaireEstValide()) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }
    this.enregistrer.emit({ ...this.donneesFormulaire });
  }
}
