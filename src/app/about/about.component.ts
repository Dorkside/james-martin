import { Component, OnInit } from '@angular/core';
import { MainStore } from '../main.store';
import { computed } from 'mobx-angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private store: MainStore) { }

  ngOnInit() {
  }

  @computed get page() {
    return this.store.getPage("about");
  }

}
