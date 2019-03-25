import { Component, OnInit } from '@angular/core';
import { computed } from 'mobx-angular';
import { MainStore } from '../main.store';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor(private store: MainStore) {
  }

  ngOnInit() {
  }

  @computed get skillCategories() {
    return this.store.getSkillCategories;
  }
}
