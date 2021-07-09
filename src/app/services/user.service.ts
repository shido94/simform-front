import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../@core/http.service';
import { User } from '../shared/interface/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userSubject$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private httpService: HttpService) {
    this.userSubject$ = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
  }

  // tslint:disable-next-line:typedef
  public get currentUservalue() {
    return this.userSubject$.value;
  }

  getUserDetails(): Observable<User> {
    return this.httpService.get('/user');
  }

  getProfile(): Observable<User> {
      return this.userSubject$.asObservable();
  }

  updateProfile(user): Observable<any> {
    return this.httpService.put('/user/profile', user);
  }

  uploadPic(formData): Observable<User> {
    return this.httpService.post('/user/upload', formData);
  }

  followUser(followId): Observable<any> {
    return this.httpService.post(`/user/follow/${followId}`, {});
  }

  setProfile(user: User): any {
      this.userSubject$.next(user);
      localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): any {
    this.userSubject$.next(null);
    localStorage.removeItem('user');
  }

  addUser(user): Observable<User> {
    return this.httpService.post('/user/add', user);
  }

  getDetails(id): Observable<User> {
    return this.httpService.get(`/user/${id}`);
  }
  getFOllowsDetails(id): Observable<any> {
    return this.httpService.get(`/user/follows/${id}`);
  }
}
