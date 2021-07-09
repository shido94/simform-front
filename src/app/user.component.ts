import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from './@core/notification.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  template: '',
  styles: ['']
})
export class UserComponent implements OnInit {
  token: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        this.token = params['token'];
    });

    this.authService.validateToken(this.token).subscribe((result) => {
        if (result.code !== 200) {
          this.notificationService.error('Login', 'Invalid Token');
        } else {
          this.userService.setProfile(result.result.user);
          localStorage.setItem('token', result.result.token);
          this.notificationService.success('Login', 'Successfully LoggedIn');
          this.router.navigate(['/']);
        }
      }, (error) => {
        const message = error.error.message || 'Something went wrong';
        this.notificationService.error('Login', message);
      });
  }
}
