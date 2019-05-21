import { Component, OnInit } from '@angular/core';
import { computed, observable } from 'mobx-angular';

import { MainStore } from '../main.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @observable postId: string = "";

  constructor(private store: MainStore, private route: ActivatedRoute) {
    route.params.subscribe(params => {
      console.log(params)
      if (params.id) {
        this.postId = params.id;
      }
    })
  }

  ngOnInit() {
  }

  @computed get post() {
    return this.store.getPosts.find(p => p.id === this.postId);
  }
}
