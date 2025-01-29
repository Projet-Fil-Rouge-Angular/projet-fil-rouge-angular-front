import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CoursesService } from '../../core/services/courses/courses.service';
import { Course } from '../../core/models/courses/course.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false,
  styleUrls: ['./cart.component.css'],
  providers: [DatePipe]
})
export class CartComponent implements OnInit {
  cart: any = null;
  coursesMap: { [key: number]: Course } = {}; 
  showModal = false;
  purchaseSummary: Course[] = [];

  constructor(
    private cartService: CartService,
    private coursesService: CoursesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((cartResponse) => {
      this.cart = cartResponse;
      this.loadCourseDetails();
    });
  }

  loadCourseDetails() {
    this.coursesService.getCourses().subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.coursesMap = {};
        response.data.forEach((course: Course) => {
          this.coursesMap[course.id] = course;
        });
      } else {
        console.error("Les cours récupérés ne sont pas un tableau :", response);
      }
    });
  }

  removeFromCart(courseId: number) {
    this.cartService.removeCourseFromCart(courseId).subscribe(() => {
      this.loadCart();
    });
  }

  preparePurchaseSummary() {
    this.purchaseSummary = this.cart.courses.map((item: { courseId: number; }) => this.coursesMap[item.courseId]);
    this.showModal = true;
  }

  confirmPurchase() {
    this.cartService.clearCart().subscribe(() => {
      this.showModal = false;
      this.cart = { courses: [] };
      alert("Achat confirmé !");
    });
  }

  closeModal() {
    this.showModal = false;
  }

  formatSchedule(schedule: string): string {
    return this.datePipe.transform(schedule, 'short') || '';
  }

  calculateTotalPrice(): number {
    return this.cart.courses.reduce((total: number, item: { courseId: number; }) => {
      const course = this.coursesMap[item.courseId];
      return total + course.price;
    }, 0);
  }
}
