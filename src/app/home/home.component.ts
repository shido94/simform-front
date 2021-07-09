import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items = [];
  post: string;
  postSubject: Subject<any> = new Subject();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.myPost().subscribe((result: any) => {
      this.items = result.result;
    });

    // Subscribe to the subject, which is triggered with each keyup
    // When the debounce time has passed, we add a validator and update the form control to check validity
    this.postSubject.pipe(
      debounceTime(300),
      filter(x => x.length > 2),
      distinctUntilChanged(),
      switchMap(searchTerm => this.postService.myPost(searchTerm).pipe(
        takeUntil(this.postSubject)
      ))
  ).subscribe((result) => {
      console.log('RES', result);
      if (result.code === 200) {
        this.items = result.result;
      }
  });
  }

  onSearch(post: string): void {
    this.postSubject.next(post);
  }

}
