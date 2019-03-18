import { Injectable } from '@angular/core';
import { types } from 'mobx-state-tree';
import { applySnapshot } from 'mobx-state-tree';
import { ApiService } from './api.service';
import { string } from 'mobx-state-tree/dist/internal';

const Post = types.model('Post', {
  id: types.identifier,
  publication: types.optional(string, ""),
  title: string,
  content: string
})

const RootStore = types.model({
  posts: types.array(Post)
}).actions(self => ({
  applyPosts(posts) {
    applySnapshot(self, {
      posts: posts
    })
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
      const data = result.data['allPost']['edges'].map(edge => {
        const { __typename, ...node } = edge['node']
        return node;
      });
      this.root.applyPosts(data);
    })
  }

  getPosts() {
    return this.root.getPosts();
  }
}
