import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CoursesComponent, CourseCardComponent],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [CoursesComponent, CourseCardComponent],
})
export class CoursesModule {}
