import { Component, OnInit } from '@angular/core';
import { computed } from 'mobx-angular';

import { MainStore } from '../main.store';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private store: MainStore) {
  }

  ngOnInit() {
  }

  @computed get posts() {
    return this.store.getPosts();
  }
}
