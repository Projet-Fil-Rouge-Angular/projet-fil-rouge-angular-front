import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    CoursesComponent,
    CourseCardComponent,
  ],
})
export class CoursesModule {}
