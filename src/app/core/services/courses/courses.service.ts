import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Course } from '../../models/courses/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste complète des cours disponibles.
   * @returns Un `Observable` contenant un tableau d'objets `Course`.
   */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  /**
   * Récupère un cours spécifique en fonction de son identifiant.
   * @param id L'identifiant du cours à récupérer.
   * @returns Un `Observable` contenant les détails du cours.
   */
  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  /**
   * Ajoute un nouveau cours à la base de données.
   * @param course L'objet contenant les informations du cours à ajouter.
   * @returns Un `Observable` contenant la réponse de l'API après l'ajout.
   */
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses`, course);
  }

  /**
   * Met à jour un cours existant en fonction de son identifiant.
   * @param id L'identifiant du cours à mettre à jour.
   * @param course L'objet contenant les nouvelles données du cours.
   * @returns Un `Observable` contenant la réponse de l'API après la mise à jour.
   */
  updateCourse(id: string, course: Partial<Course>): Observable<Course> {
    return this.http.patch<Course>(`${this.apiUrl}/courses/${id}`, course);
  }

  /**
   * Supprime un cours de la base de données en fonction de son identifiant.
   * @param id L'identifiant du cours à supprimer.
   * @returns Un `Observable` contenant la réponse de l'API après la suppression.
   */
  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }
}
