import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseDetailedComponent } from './features/course-detailed/course-detailed.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
