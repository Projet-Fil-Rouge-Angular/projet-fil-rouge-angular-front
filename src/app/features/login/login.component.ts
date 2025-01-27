import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.validateToken().subscribe({
      next: (isValid) => {
        if (isValid) {
          this.router.navigate(['/admin-dashboard']);
        }
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (_) => {
        const userRole = this.authService.getUserRole();

        if (userRole === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (userRole === 'User') {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
