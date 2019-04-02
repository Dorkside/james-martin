import { Component, OnInit } from '@angular/core';
import { observable, action } from 'mobx-angular';

declare var Snap: any;
declare var mina: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @observable menuOpen = false;

  @action
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit() {
    var myDrawing1 = new Drawing(1000);
    myDrawing1.init();
    myDrawing1.draw();
  }
}

export class Drawing {
  s;
  fragment;
  pathArray;
  group;
  timeBetweenDraws;
  currentPathIndex;
  leng;
  easeout;

  constructor(timeBetweenDraws) {
    this.s = Snap("#svgout");
    this.pathArray = this.s.selectAll('path').clone();
    this.s.clear();
    this.group = this.s.g().drag();
    this.timeBetweenDraws = timeBetweenDraws;
  };

  init() {
    this.group.clear();
    this.currentPathIndex = 0;
  };

  endReached() {
    if (this.currentPathIndex >= this.pathArray.length) {
      return true;
    };
  };

  callOnFinished() {
  }

  draw = () => {
    console.log(mina.easeout);
    if (this.endReached()) {
      if (this.callOnFinished) {
        this.callOnFinished();
        return
      };
    };
    var myPath = this.pathArray[this.currentPathIndex];

    this.leng = myPath.getTotalLength();

    this.group.append(myPath);

    myPath.attr({
      "fill": "none",
      "stroke": "#000",
      "strokeWidth": 3,
      "stroke-dasharray": this.leng + " " + this.leng,
      "stroke-dashoffset": this.leng
    });

    this.currentPathIndex++;

    myPath.animate({ "stroke-dashoffset": 0 }, 10000, mina.easeout, this.draw);
  }
}