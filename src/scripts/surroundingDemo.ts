import {
  Component,
  View,
  OnInit,
  OnDestroy
} from "angular2/core";

import {
  CORE_DIRECTIVES
} from "angular2/common";

@Component({
  selector: 'surrounding-demo'
})

@View({
  directives: [CORE_DIRECTIVES],
  template: `
    <div id='main'>
      <article [ngClass]='{"in-crowd": peopleCount > 1}'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue. Phasellus volutpat neque ac dui mattis vulputate.
        Etiam consequat aliquam cursus. In sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur felis nec, feugiat ultricies mi.
        Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor, orci enim rutrum enim, vel tempor sapien arcu a tellus. Vivamus convallis
        sodales ante varius gravida. Curabitur a purus vel augue ultrices ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et.
        Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis,
        iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae.
        Phasellus ornare dui nec orci posuere, nec luctus mauris semper.</p>
        <p>Morbi viverra, ante vel aliquet tincidunt, leo dolor pharetra quam, at semper massa orci nec magna. Donec posuere nec sapien sed laoreet.
        Etiam cursus nunc in condimentum facilisis. Etiam in tempor tortor. Vivamus faucibus egestas enim, at convallis diam pulvinar vel. Cras ac orci eget
        nisi maximus cursus. Nunc urna libero, viverra sit amet nisl at, hendrerit tempor turpis. Maecenas facilisis convallis mi vel tempor. Nullam vitae nunc leo.
        Cras sed nisl consectetur, rhoncus sapien sit amet, tempus sapien.</p>
        <p>Integer turpis erat, porttitor vitae mi faucibus, laoreet interdum tellus. Curabitur posuere molestie dictum. Morbi eget congue risus, quis rhoncus quam.
        Suspendisse vitae hendrerit erat, at posuere mi. Cras eu fermentum nunc. Sed id ante eu orci commodo volutpat non ac est. Praesent ligula diam, congue eu enim
        scelerisque, finibus commodo lectus.</p>
      </article>
      <nav>
        <h3> Crowd Detector (tracking.js) </h3>
        <div class="demo-frame">
          <div class="demo-container">
            <video id="video" width="320" height="240" preload autoplay loop muted></video>
          </div>
          <button [disabled]="videoTrack && videoTrack.running_ === true" (click)="startTracking()"> Start Tracking </button>
        </div>
      </nav>
      <aside [ngClass]='{"in-crowd": peopleCount > 1}'>
        <H3>Corporate Emails and Messages </H3>
      </aside>
    </div>
  `
})

export class SurroundingDemo implements OnInit {
  peopleCount:Number = 0;
  videoTrack:Object = null;

  constructor() {}

  ngOnInit() {
    let video = document.getElementById('video');
    let tracker = new tracking.ObjectTracker(['face', 'eye']);
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    this.videoTrack = tracking.track('#video', tracker, { camera: true });
    tracker.on('track', (event) => {
      console.log(event.data.length);
      this.peopleCount = event.data.length;
      // This is a workaround to make the demo works.
      if (this.peopleCount > 1) {
        this.videoTrack.stop();
      }
    });
  }

  startTracking() {
    if(!this.videoTrack.running_) {
      this.videoTrack.run();
    }
  }
}
