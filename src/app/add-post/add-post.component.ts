import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../@core/notification.service';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

class ImageSnippet {
  constructor(public src: any, public file: File) {}
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  userImage = 'https://bootdey.com/img/Content/avatar/avatar6.png';
  formData = new FormData();
  form: FormGroup;
  loading = false;
  categories = [];
  category;
  selectedFile: ImageSnippet = {
    src: '',
    file: null
  };

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private notificationService: NotificationService,
    private userService: UserService,
    private router: Router) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  valueSelected(value): any {
    this.category = value;
  }
  ngOnInit(): void {
    this.postService.getCategory().subscribe(result => {
      this.categories = result.result;
    }, (error) => {
      const message = error.error.message || 'Something went wrong';
      this.notificationService.error('Category', message);
    });
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile.src = event.target.result;
    });

    this.loading = true;
    reader.readAsDataURL(file);

    reader.onload = (e: any) => {
      this.selectedFile.file = file;
      this.formData.append('avatar', this.selectedFile.file);
    };
  }

  addPost(): void {
    this.formData.append('category', this.category);
    this.formData.append('title', this.form.value.title);
    this.formData.append('description', this.form.value.description);

    this.postService.createPost(this.formData).subscribe((result: any): void => {
      this.router.navigate(['/']);
    }, (error) => {
      const message = error.error.message || 'Something went wrong';
      this.notificationService.error('Login', message);
    });
  }
}
