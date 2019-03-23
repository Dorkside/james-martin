import { Injectable } from '@angular/core';
import { types } from 'mobx-state-tree';
import { ApiService } from './api.service';
import * as moment from 'moment';
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

export const RootStore = types.model({
  posts: types.array(Post),
  pages: types.map(Page)
}).actions(self => ({
  applyPosts(posts) {
    self.posts = posts;
  },
  applyPages(pages) {
    self.pages = pages;
  }
})).views(self => ({
  getPosts() {
    return self.posts
  },
  getPage(page) {
    return self.pages.get(page)
  }
}));

@Injectable({
  providedIn: 'root'
})
export class MainStore {
  root = RootStore.create({
    posts: [],
    pages: {}
  });

  constructor(private api: ApiService) {
    this.api.getPosts().subscribe(result => {
      const data = result.data['posts'].map(post => {
        const { __typename, ..._post } = post
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
  }

  getPosts() {
    return this.root.getPosts();
  }

  getPage(page) {
    return this.root.getPage(page);
  }
}
