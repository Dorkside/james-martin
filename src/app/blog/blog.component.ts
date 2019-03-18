import { Component, OnInit } from '@angular/core';
import { MainStore } from '../main.store';
import { computed } from 'mobx';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private store: MainStore) { }

  ngOnInit() {
  }

  @computed get posts() {
    return this.store.getPosts();
  }
}
