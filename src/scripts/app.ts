/**
 * The main entry point to our angular application.
 *
 * Created by owais zahid <owais.zahid@autodesk.com> on 02/26/2016.
 *
 * This is a simple application for Nest home network that uses firebase.
 */
import {
  Component,
  provide
} from "angular2/core";

import {
  RouteConfig,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS
} from 'angular2/router';

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
  Demo1
} from './demo1';

import {
  Demo2
} from './demo2';

@Component({
  selector: 'my-app',
  template: `
    <h1>Component Router</h1>
    <nav>
      <a [routerLink]="['Demo1']">Demo 1</a>
      <a [routerLink]="['Demo2']">Demo 2</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path:'demo1', name: 'Demo1', component: Demo1},
  {path:'demo2', name: 'Demo2', component: Demo2}
])
class AppComponent { }

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(FirebaseService, {useFactory: () => new FirebaseService(new Firebase(Settings.NEST_SERVICE))})
]);
