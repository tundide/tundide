import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'signin',
  styleUrls: ['signin.component.scss'],
  templateUrl: 'signin.component.html'
})
export class SigninComponent {
  public error: string;
  constructor(private authService: AuthService) {
    let token = localStorage.getItem('token');

    if (token != null) {
      window.location.href = '/admin/#/dashboard';
    }
  }

  submitForm(form: any): void {
    this.authService.signin(form.email, form.password).subscribe(
      (data) => {
        localStorage.setItem('token', data.toString());
        window.location.href = '/admin/#/dashboard';
      }, (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.error = error.error.message;
        } else if (error.status === 500) {
          this.error = error.error.message;
        }
      }
    );
  }
}