import { Component, OnInit } from '@angular/core';
import { computed } from 'mobx-angular';

import { MainStore } from '../main.store';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  constructor(private store: MainStore) { }

  ngOnInit() {
  }

  @computed get employers() {
    return this.store.getEmployers.slice().sort((a, b) => {
      return a.startDate > b.startDate ? -1 : 1;
    });
  }

  @computed get projects() {
    // return this.store.getProjects.slice().sort((a, b) => {
    //   return a.startDate > b.startDate ? -1 : 1;
    // });
    return this.store.getProjects;
  }
}
