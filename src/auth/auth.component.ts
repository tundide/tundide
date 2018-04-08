import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './auth.service';
const _delay = require('lodash/delay');

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'auth',
  styleUrls: ['auth.component.scss'],
  templateUrl: 'auth.component.html'
})
export class AuthComponent {
  private subscription: Subscription;
  private uid: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.subscription = this.route.queryParams.subscribe(
      (queryParam: any) => {

        if (queryParam['uid']) {
          this.uid = queryParam['uid'];

          this.authService.confirm(this.uid).subscribe(
            data => {
              _delay(() => {
                this.router.navigate(['/auth/signin']);
              }, 5000);
            }
          );
        } else {
          this.uid = null;
        }
      });
  }
}