import {
  Component,
  View,
  OnInit,
  OnDestroy
} from "angular2/core";

import {
  CORE_DIRECTIVES
} from "angular2/common";

@Component({})

@View({
  directives: [CORE_DIRECTIVES],
  template: `
    <div>
      <div *ngIf="peopleCount < 2">
        We know you are alone.
      </div>
      <div *ngIf="peopleCount >= 2">
        Hmm.. In a crowd.
      </div>
      <div class="demo-frame">
        <div class="demo-container">
          <video id="video" width="320" height="240" preload autoplay loop muted></video>
        </div>
      </div>
    </div>
  `
})

export class Demo2 implements OnInit {
  peopleCount:Number = 0;

  constructor() {}

  ngOnInit() {
    var video = document.getElementById('video');
    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track('#video', tracker, { camera: true });
    tracker.on('track', (event) => {
      this.peopleCount = event.data.length;
    });
  }
}
