import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from '../@core/notification.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/interface/user';
import { forkJoin } from 'rxjs';

class ImageSnippet {
  constructor(public src: any, public file: File) {}
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userImage = 'https://bootdey.com/img/Content/avatar/avatar6.png';
  user: User;
  loading = false;
  category: string;
  categories = [];
  selectedFile: ImageSnippet = {
    src: '',
    file: null
  };

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(result => {
      this.user = result;
      this.selectedFile.src = this.user.image;
    }, (error) => {
      const message = error.error.message || 'Something went wrong';
      this.notificationService.error('Profile', message);
    });

    this.postService.getCategory().subscribe(result => {
      this.categories = result.result;
    }, (error) => {
      const message = error.error.message || 'Something went wrong';
      this.notificationService.error('Category', message);
    });
  }

  updateProfile(): void {
    this.userService.updateProfile(this.user).subscribe(result => {
      console.log(result);
      if (result.code !== 200) {
        this.notificationService.error('Profile', result.string);
        return;
      }

      this.userService.setProfile(result.result);
      this.notificationService.success('Profile', 'Profile updated');
    }, (error) => {
      const message = error.error.message || 'Something went wrong';
      this.notificationService.error('Profile', message);
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

      const formData = new FormData();
      formData.append('avatar', this.selectedFile.file);

      this.userService.uploadPic(formData).subscribe((result: any) => {
        if (result.code !== 200) {
          this.notificationService.error('Profile', result.string);
          return;
        }

        this.userService.setProfile(result.result);
        this.notificationService.success('Profile', 'Pic updated');
      }, (error) => {
        const message = error.error.message || 'Something went wrong';
        this.notificationService.error('Profile', message);
      });
    };
  }

  addCategory(): any {
    this.postService.addCategory(this.category).subscribe((result) => {
      if (result.code !== 200) {
        this.notificationService.error('Category', result.string);
        return;
      }

      this.categories.unshift(result.result);
      this.notificationService.success('Category', result.string);
    }, (error) => {
      const message = error.error.message || 'Something went wrong';
      this.notificationService.error('Category', message);
    });
  }

}
