import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpService } from '../@core/http.service';
import { User } from '../shared/interface/user';
import { ConstantService } from '../@core/constant.service';
const Constant =  new ConstantService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpService: HttpService) {}
  login(): Observable<User> {
    return this.httpService.get('/user/auth/google');
  }

  update(user: any): Observable<User> {
    return this.httpService.post('/user/edit', user);
  }

  validateToken(token: string): Observable<any> {
    return this.httpService.post('/user/token/validate', {token});
  }
}
