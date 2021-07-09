import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {
  user = null;

  constructor(private userService: UserService, private router: Router) {
    this.userService.getProfile().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  showName(user): string {
    return user.name.split(' ')[0];
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.clear();
    this.userService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
