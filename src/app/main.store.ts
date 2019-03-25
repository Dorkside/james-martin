import { Injectable } from '@angular/core';
import { types, getSnapshot } from 'mobx-state-tree';
import { ApiService } from './api.service';
import * as moment from 'moment';
import { computed } from 'mobx-angular';
moment.locale('fr');

export const Post = types.model('Post', {
  id: types.identifier,
  publication: types.optional(types.string, ""),
  title: types.string,
  content: types.string
}).views(self => ({
  prettyDate() {
    return moment(self.publication).format('D MMM YYYY')
  }
}))

export const Page = types.model('Page', {
  title: types.identifier,
  content: types.string
})

export const Project = types.model('Project', {
  title: types.string,
  poste: types.string,
  description: types.string,
  startDate: types.string,
  endDate: types.maybeNull(types.string)
}).views(self => ({
  years() {
    const start = moment(self.startDate).format('YYYY');
    const end = self.endDate ? moment(self.endDate).format('YYYY') : "Aujourd'hui";
    return start !== end ? `${start} - ${end}` : start;
  }
}))

export const SkillCategory = types.model('SkillCategory', {
  name: types.identifier,
  skills: types.maybeNull(types.array(types.reference(types.late(() => Skill))))
})

export const Skill = types.model('Skill', {
  id: types.identifier,
  name: types.string,
  type: types.enumeration(["Language", "Concept", "Technology"]),
  skillCategory: types.maybeNull(types.reference(types.late(() => SkillCategory)))
})

export const RootStore = types.model({
  posts: types.array(Post),
  pages: types.map(Page),
  projects: types.array(Project),
  skillCategories: types.array(SkillCategory),
  skills: types.array(Skill)
}).actions(self => ({
  applyPosts(posts) {
    self.posts = posts;
  },
  applyPages(pages) {
    self.pages = pages;
  },
  applyProjects(projects) {
    self.projects = projects;
  },
  applySkillCategories(skillCategories) {
    self.skillCategories = skillCategories;
  },
  applySkills(skills) {
    self.skills = skills;
  }
})).views(self => ({
  getPosts() {
    return self.posts
  },
  getPage(page) {
    return self.pages.get(page)
  },
  getProjects() {
    return self.projects
  },
  getSkillCategories() {
    return self.skillCategories
  }
}));

@Injectable({
  providedIn: 'root'
})
export class MainStore {
  root = RootStore.create({
    posts: [],
    pages: {},
    projects: [],
    skillCategories: [],
    skills: []
  });

  constructor(private api: ApiService) {
    this.api.getPosts().subscribe(result => {
      const data = result.data['posts'].map(post => {
        const { __typename, ..._post } = post;
        return _post;
      });
      this.root.applyPosts(data);
    })
    this.api.getPages().subscribe(result => {
      const data = result.data['pages'].reduce((acc, page) => {
        const { __typename, ..._page } = page;
        acc[_page.title] = _page;
        return acc;
      }, {});
      this.root.applyPages(data);
    })
    this.api.getProjects().subscribe(result => {
      const data = result.data['projects'].map(project => {
        const { __typename, ..._project } = project;
        return _project;
      });
      this.root.applyProjects(data);
    })
    this.api.getSkillCategories().subscribe(result => {
      const data = result.data['skillCategories'].map(skillCategory => {
        const { __typename, skills, ..._skillCategory } = skillCategory;
        return { ..._skillCategory, skills: skills ? skills.map(skill => skill.id) : null };
      });
      this.root.applySkillCategories(data);
    })
    this.api.getSkills().subscribe(result => {
      const data = result.data['skills'].map(skill => {
        const { __typename, skillCategory, ..._skill } = skill;
        return { ..._skill, skillCategory: skillCategory ? skillCategory.name : null };
      });
      this.root.applySkills(data);
    })
    console.log(this.root)
  }

  @computed get getPosts() {
    return this.root.getPosts();
  }

  getPage(page) {
    return this.root.getPage(page);
  }

  @computed get getProjects() {
    return this.root.getProjects();
  }

  @computed get getSkillCategories() {
    return this.root.getSkillCategories();
  }
}
