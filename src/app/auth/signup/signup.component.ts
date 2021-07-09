import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/@core/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { regexValidators } from 'src/app/validators/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router) {
    const currentUser = this.userService.currentUservalue;
    if (currentUser) {
      this.router.navigate(['/']);
    }

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(regexValidators.email)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
}

ngOnInit(): void {
}

signupForm(): void {
  this.authService.signup(this.form.value).subscribe((result: any): void => {
    if (result.code !== 200) {
      this.notificationService.error('SignUp', result.string);
    } else {
      this.notificationService.success('SignUp', result.string);
      this.router.navigate(['/']);
    }
  }, (error) => {
    const message = error.error.message || 'Something went wrong';
    this.notificationService.error('SignUp', message);
  });
}
}
