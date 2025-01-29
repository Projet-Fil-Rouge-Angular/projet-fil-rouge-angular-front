import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Récupère le panier de l'utilisateur.
   * @returns Un `Observable` contenant les informations du panier.
   */
  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/carts`);
  }

  /**
   * Ajoute un cours au panier.
   * @param courseId L'identifiant du cours à ajouter.
   * @param schedule La date et l'heure programmées pour le cours.
   * @returns Un `Observable` contenant la réponse de l'API après l'ajout.
   */
  addCourseToCart(courseId: number, schedule: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/carts/courses`, { courseId, schedule });
  }

  /**
   * Supprime un cours du panier.
   * @param courseId L'identifiant du cours à supprimer.
   * @returns Un `Observable` contenant la réponse de l'API après la suppression.
   */
  removeCourseFromCart(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carts/courses/${courseId}`);
  }

  /**
   * Vide complètement le panier de l'utilisateur.
   * @returns Un `Observable` contenant la réponse de l'API après la suppression de tous les éléments.
   */
  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carts`);
  }
}
