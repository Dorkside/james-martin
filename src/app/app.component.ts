import { Component } from '@angular/core';
import { observable, action } from 'mobx-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @observable menuOpen = false;

  @action
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
