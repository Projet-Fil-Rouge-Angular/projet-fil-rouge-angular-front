import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../../core/models/courses/course.model';
import { CartService } from '../../../core/services/cart/cart.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  standalone: false,
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;
  isUserLoggedIn = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Souscription à l'état de connexion de l'utilisateur
    this.authService.authStatus$.subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
    });
  }

  addToCart(): void {
    const schedule = new Date().toISOString();
    this.cartService.addCourseToCart(this.course.id, schedule).subscribe(
      () => {
        alert('Cours ajouté au panier !');
      },
      (error) => {
        alert('Erreur : ' + error.error.message);
      }
    );
  }
}
