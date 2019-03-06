import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/blog',
    pathMatch: 'full'
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'skills',
    component: BlogComponent
  },
  {
    path: 'experience',
    component: BlogComponent
  },
  {
    path: 'about',
    component: BlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
