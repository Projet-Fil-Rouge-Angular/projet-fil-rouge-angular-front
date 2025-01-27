import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userRole: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.authStatus$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.userRole = this.authService.getUserRole();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
