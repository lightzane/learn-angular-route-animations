import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './my-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {

  prepareRoute(outlet: RouterOutlet) {
    // return outlet?.activatedRouteData?.animation;
    return outlet?.activatedRouteData?.myCustom;
  }

}
