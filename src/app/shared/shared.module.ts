import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotificationComponent, HeaderComponent, FooterComponent],
  exports: [NotificationComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule]
})
export class SharedModule { }
