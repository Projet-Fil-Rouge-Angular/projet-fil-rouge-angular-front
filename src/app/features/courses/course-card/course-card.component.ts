import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
  @Output() courseAddedToCart = new EventEmitter<string>();
  isUserLoggedIn = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.authStatus$.subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
    });
  }

  addToCart(): void {
    const schedule = new Date().toISOString();
    this.cartService.addCourseToCart(this.course.id, schedule).subscribe(
      () => {
        this.courseAddedToCart.emit('Cours ajouté au panier !');
      },
      (error) => {
        if (error.status === 400) {
            this.courseAddedToCart.emit('Ce cours est déjà dans votre panier');
            const notificationElement = document.querySelector('.notification');
            if (notificationElement) {
            notificationElement.classList.add('error');
            }
        }
        else {
          this.courseAddedToCart.emit('Erreur lors de l\'ajout au panier');
        }
      }
    );
  }
}
