import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';

import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';
import { CourseDetailedComponent } from './features/course-detailed/course-detailed.component';
import { HomeComponent } from './features/home/home.component';
import { CoursesModule } from './features/courses/courses.module';
import { CommonModule } from '@angular/common';
import { CartComponent } from './features/cart/cart.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, CourseDetailedComponent, HomeComponent, CartComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    CoursesModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    SharedModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
