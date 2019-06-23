import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {Role} from "./models/role";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'TimeReporting';
  showHead:boolean;
  isLogin:boolean;
  role:Role;
  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] !== '/login') {
          console.log(event);
          var pom = window.sessionStorage.getItem('user');
          if(pom!=null){
          this.isLogin = true;
          }
        } else {
          this.isLogin = false;
        }
      }
    });
  }
}
