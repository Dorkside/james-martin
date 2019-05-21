import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/blog',
    pathMatch: 'full'
  },
  {
    path: 'article/:id',
    component: ArticleComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
