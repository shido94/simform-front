import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user.component';
import { AuthGaurd } from './utlis/auth.gaurd';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGaurd],
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'post/create',
    canActivate: [AuthGaurd],
    component: AddPostComponent
  },
  {
    path: 'user/profile',
    canActivate: [AuthGaurd],
    component: ProfileComponent
  },
  {
    path: 'user/:token',
    component: UserComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
