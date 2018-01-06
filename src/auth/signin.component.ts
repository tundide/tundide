import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'signin',
  styleUrls: ['signin.component.scss'],
  templateUrl: 'signin.component.html'
})
export class SigninComponent {
  constructor(private authService: AuthService) {
    let token = localStorage.getItem('token');

    if (token != null) {
      window.location.href = '/admin/#/dashboard';
    }
  }

  submitForm(form: any): void {
    this.authService.signin(form.email, form.password).subscribe(
      data => {
        localStorage.setItem('token', JSON.stringify(data));
        window.location.href = '/admin/#/dashboard';
      }
    );
  }
}