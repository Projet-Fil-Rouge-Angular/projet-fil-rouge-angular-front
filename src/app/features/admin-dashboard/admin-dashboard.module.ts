import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthGuard } from '../../core/guards/auth/auth.guard';
import { CourseFormComponent } from './course-form/course-form.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [AdminDashboardComponent, CourseFormComponent, ModalComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class AdminDashboardModule {}
