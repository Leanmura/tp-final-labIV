import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { myAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    myAnimation,
  ]
})
export class AppComponent {
  title = 'tp-final';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
