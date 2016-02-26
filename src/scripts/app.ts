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
  FirebaseService
} from 'firebase-angular2/core';

import {
  bootstrap
} from 'angular2/platform/browser'

declare var Firebase;

@Component({
  selector: 'my-app'  // Selector provides flexibility and the concept is similar to CSS selectors, XPath or JQuery selector. More on this in later tutorials.
})

// Use @View Annotation to indicate that the component has a view. Note: If we are using syntatic sugar then you can define template in the component annotation as well.
@View({
  // Unlike Angular 1, not every directive is available in the context. We need to declare the once we will be using in the template.
  directives: [],
  template: `
    <div class='main-container'>
      Test App. TODO:
    </div>
  `
})

// Class will provide the meaning to the component. The properties of the class can be used in the template. Class will be
// used to interact with other components and services.
class AppComponent {
  constructor(private firebaseService:FirebaseService) {
    firebaseService.firebase.
      auth("c.rhwDbBU2H28i7VbxEvJYQLHMROaalsHlDLz2XrGw5vs3gDkEz7Ngxu5D78kK9GA4ADAk46E811UBrHp8ZhWOcZPHdQ1sesiqNARENePxMSypdpKC6Mz1ksiCsONcrpq4oJOxg1bbYYx01g8n");

    /*firebaseService.firebase.on('value', (snapshot) => {
      var data = snapshot.val();

      var structure = this.firstChild(data.structures);
      var thermostate = data.devices.thermostats[structure.thermostats[0]];

      console.log(structure, thermostate);
    });*/

    firebaseService.firebase.child('devices/thermostats').on('value', (snapshot) => {
      console.log(snapshot.val());
    })
  }

  firstChild(object) {
    for(var key in object) {
      return object[key];
    }
  }
}

// Use this function to Bootstrap or Loading a new component at the root level of the application.
bootstrap(AppComponent, [
  provide(FirebaseService, {useFactory: () => new FirebaseService(new Firebase('wss://developer-api.nest.com'))})
]);
