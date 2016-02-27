/**
 * The main entry point to our angular application.
 *
 * Created by owais zahid <owais.zahid@autodesk.com> on 02/26/2016.
 *
 * This is a simple application for Nest home network that uses firebase.
 */
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
  FirebaseService
} from 'firebase-angular2/core';

import {
  bootstrap
} from 'angular2/platform/browser';

import {
  Settings
} from './settings';

declare var Firebase;

@Component({
  selector: 'my-app',
  viewProviders: [HTTP_PROVIDERS]
})

@View({
  directives: [NgClass],
  template: `
    <div class='main-container' [ngClass]='{
        "low-temp-night": isDay === false && currentAmbientTemperature < TEMP_MEDIAN,
        "high-temp-night": isDay === false && currentAmbientTemperature >= TEMP_MEDIAN,
        "low-temp-day": isDay === true && currentAmbientTemperature < TEMP_MEDIAN,
        "high-temp-day": isDay === true && currentAmbientTemperature >= TEMP_MEDIAN
      }'>
      Test App. TODO:
    </div>
  `
})

class AppComponent {
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
bootstrap(AppComponent, [
  provide(FirebaseService, {useFactory: () => new FirebaseService(new Firebase(Settings.NEST_SERVICE))})
]);
