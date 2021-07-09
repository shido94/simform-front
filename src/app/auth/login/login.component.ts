import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/@core/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { regexValidators } from 'src/app/validators/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

    constructor(
      private userService: UserService,
      private fb: FormBuilder,
      private authService: AuthService,
      private notificationService: NotificationService,
      private httpClient: HttpClient,
      private router: Router) {
      const currentUser = this.userService.currentUservalue;
      if (currentUser) {
        this.router.navigate(['/']);
      }

      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(regexValidators.email)]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  ngOnInit(): void {
  }

  googleLogin(): void {
    window.location.href = 'http://localhost:3000/user/auth/google';
  }

  loginForm(): void {
    this.authService.login(this.form.value).subscribe((result: any): void => {
      if (result.code !== 200) {
        this.notificationService.error('Login', result.string);
      } else {
        console.log(result);
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
