import {
  Component,
  View,
  provide
} from "angular2/core";

import {
  NgClass
} from "angular2/common";

import {
  Http,
  HTTP_PROVIDERS
} from 'angular2/http';

import {
  Settings
} from './settings';

import {
  FirebaseService
} from 'firebase-angular2/core';

declare var Firebase;

@Component({
  selector: 'environment-demo',
  viewProviders: [HTTP_PROVIDERS]
})

@View({
  directives: [NgClass],
  template: `
    <div id='main' class='main-container' [ngClass]='{
        "low-temp-night": isDay === false && currentAmbientTemperature < TEMP_MEDIAN,
        "high-temp-night": isDay === false && currentAmbientTemperature >= TEMP_MEDIAN,
        "low-temp-day": isDay === true && currentAmbientTemperature < TEMP_MEDIAN,
        "high-temp-day": isDay === true && currentAmbientTemperature >= TEMP_MEDIAN
      }'>
      <article>
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
    </div>
  `
})

export class EnvironmentDemo {
  currentAmbientTemperature: Number;
  isDay: Boolean = false;
  TEMP_MEDIAN: Number = 25;

  constructor(private firebaseService:FirebaseService, private http: Http) {
    firebaseService.firebase.auth(Settings.ACCESS_TOKEN);

    firebaseService.firebase.child('devices/thermostats').on('value', (snapshot) => {
      let termostat = ((obj) => {
        for(let key in obj) {
          return obj[key];
        }
      }) (snapshot.val());

      this.currentAmbientTemperature = termostat.ambient_temperature_c;
    });

    http.get(Settings.WEATHER_SERVICE)
      .map((response) => response.json())
      .subscribe((json) => {
        console.log(json);
        let currentDate = new Date();
        let sunrise = new Date(json.sys.sunrise * 1000);
        let sunset = new Date(json.sys.sunset * 1000);
        this.isDay = currentDate > sunrise && currentDate < sunset;
      });
  }
}
