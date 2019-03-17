import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsComponent } from './skills/skills.component';

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
    component: SkillsComponent
  },
  {
    path: 'projets',
    component: ExperienceComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
