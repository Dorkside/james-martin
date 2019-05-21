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
  },
  shortContent() {
    return self.content.split('\n')[0];
  }
}))

export const RootStore = types.model({
  posts: types.array(Post)
}).actions(self => ({
  applyPosts(posts) {
    self.posts = posts;
  }
})).views(self => ({
  getPosts() {
    return self.posts
  }
}));

@Injectable({
  providedIn: 'root'
})
export class MainStore {
  root = RootStore.create({
    posts: []
  });

  constructor(private api: ApiService) {
    this.api.getPosts().subscribe(result => {
      const data = result.data['posts'].map(post => {
        const { __typename, ..._post } = post;
        return _post;
      });
      this.root.applyPosts(data);
    });
  }

  @computed get getPosts() {
    return this.root.getPosts();
  }
}
