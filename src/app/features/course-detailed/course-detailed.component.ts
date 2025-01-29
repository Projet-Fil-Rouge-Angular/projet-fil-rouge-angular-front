import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../core/services/courses/courses.service';
import { Course } from '../../core/models/courses/course.model';

/**
 * Composant affichant les détails d'un cours spécifique.
 */
@Component({
  selector: 'app-course-detailed',
  standalone: false,
  templateUrl: './course-detailed.component.html',
  styleUrls: ['./course-detailed.component.css'],
})
export class CourseDetailedComponent implements OnInit {
  cours: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private serviceCours: CoursesService
  ) {}

  /**
   * Initialise le composant et charge les détails du cours sélectionné.
   */
  ngOnInit() {
    const identifiant = +this.route.snapshot.paramMap.get('id')!;
    this.serviceCours.getCourse(identifiant).subscribe((reponse: any) => {
      this.cours = reponse.data;
    });
  }
}
