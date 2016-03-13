/**
 * The main entry point to our angular application.
 *
 * Created by owais zahid <owais.zahid@autodesk.com> on 02/26/2016.
 *
 * This is a simple application for Nest home network that uses firebase.
 */
import {
  MATERIAL_DIRECTIVES,
  MATERIAL_PROVIDERS
} from "ng2-material/all";

import {
  Component,
  provide,
  Input,
  ViewEncapsulation
} from "angular2/core";

import {
  bootstrap
} from 'angular2/platform/browser';

import {
  FirebaseService
} from 'firebase-angular2/core';

import {
  Settings
} from './settings';

import {
  EnvironmentDemo
} from './environmentDemo';

import {
  SurroundingDemo
} from './surroundingDemo';

@Component({
  selector: 'my-app',
  template: `
    <md-content>
      <md-toolbar>
        <h2 class="app-header">
          <span>FOSSASIA Demo: Aware User Interface</span>
        </h2>
      </md-toolbar>
      <div class="demo-tabs">
        <md-tabs md-dynamic-height md-border-bottom>
          <template md-tab label="Environment Aware">
            <md-content class="md-padding">
              <h1 class="md-display-2">Environment Aware</h1>
              <environment-demo></environment-demo>
            </md-content>
          </template>
          <template md-tab label="Surrounding Aware">
            <md-content class="md-padding">
              <h1 class="md-display-2">Surrounding Aware</h1>
              <surrounding-demo></surrounding-demo>
            </md-content>
          </template>
        </md-tabs>
      </div>
    </md-content>
  `,
  directives: [MATERIAL_DIRECTIVES, EnvironmentDemo, SurroundingDemo]
})

class AppComponent { }

bootstrap(AppComponent, [
  provide(FirebaseService, {useFactory: () => new FirebaseService(new Firebase(Settings.NEST_SERVICE))})
]);
