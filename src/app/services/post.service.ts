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

export class PostService {

  constructor(private httpService: HttpService) {}
  myPost(title?: string): Observable<any>  {
    if (title) {
      return this.httpService.get(`/post?title=${title}`);
    } else {
      return this.httpService.get(`/post`);
    }
  }

  getDetails(id): any {
    return this.httpService.get(`/post/${id}`);
  }


  createPost(formData: any): Observable<any> {
    return this.httpService.post('/post', formData);
  }

  addCategory(category: string): Observable<any> {
    return this.httpService.post('/post/category', { category });
  }

  getCategory(): Observable<any> {
    return this.httpService.get(`/post/category`);
  }

  validateToken(token: string): Observable<any> {
    return this.httpService.post('/user/token/validate', {token});
  }
}
