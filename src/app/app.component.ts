import { Component, OnInit } from '@angular/core';
import { observable, action } from 'mobx-angular';

// declare var Snap: any;
// declare var mina: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @action
  toggleMenu() {
  }

  ngOnInit() {
    // var myDrawing1 = new Drawing(1000);
    // myDrawing1.init();
    // myDrawing1.draw();
  }
}

// export class Drawing {
//   s;
//   fragment;
//   pathArray;
//   group;
//   timeBetweenDraws;
//   currentPathIndex;
//   leng;
//   easeout;
//   reverse = false;

//   constructor(timeBetweenDraws) {
//     this.s = Snap("#svgout");
//     this.pathArray = this.s.selectAll('path').clone();
//     this.s.clear();
//     this.group = this.s.g().drag();
//     this.timeBetweenDraws = timeBetweenDraws;
//   };

//   init() {
//     this.group.clear();
//     this.currentPathIndex = 1;
//   };

//   startReached() {
//     if (this.currentPathIndex <= 0) {
//       return true;
//     };
//   };

//   endReached() {
//     if (this.currentPathIndex >= this.pathArray.length) {
//       return true;
//     };
//   };

//   callOnFinished() {
//     this.currentPathIndex = 1;
//     this.reverse = !this.reverse;
//   }

//   draw = () => {
//     if (this.endReached()) {
//       if (this.callOnFinished) {
//         this.callOnFinished();
//       };
//     };
//     if (this.startReached()) {
//       if (this.callOnFinished) {
//         this.s.clear();
//         this.callOnFinished();
//       };
//     };
//     var myPath = this.pathArray[this.currentPathIndex];

//     this.leng = myPath.getTotalLength();

//     if (!this.reverse) {
//       this.group.append(myPath);

//       myPath.attr({
//         "stroke-dasharray": this.leng + " " + this.leng,
//         "stroke-dashoffset": this.leng
//       });

//       myPath.addClass('stroke');

//       myPath.animate({ "stroke-dashoffset": 0 }, this.leng * 3, mina.easeout, this.draw);

//       myPath.addClass('white');
//       myPath.removeClass('black');
//     } else {
//       myPath.addClass('black');
//       myPath.removeClass('white');

//       myPath.animate({ "stroke-dashoffset": this.leng }, this.leng, mina.easeout, this.draw);
//     }

//     this.currentPathIndex++;
//   }
// }