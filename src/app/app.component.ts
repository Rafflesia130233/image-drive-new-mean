import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {


  constructor( private renderer : Renderer2, private router: Router, private activatedRoute: ActivatedRoute, @Inject(DOCUMENT,) private document: any, private element : ElementRef, public location: Location) {}
  ngOnInit() {
      var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
          if (window.outerWidth > 991) {
              window.document.children[0].scrollTop = 0;
          }


          this.renderer.listen('window', 'scroll', (event) => {
              const number = window.scrollY;
              var _location = this.location.path();
              _location = _location.split('/')[2];

              if (number > 150 || window.pageYOffset > 150) {
                  navbar.classList.remove('navbar-transparent');
              } else if (_location !== 'login' && this.location.path() !== '/nucleoicons') {
                  // remove logic
                  navbar.classList.add('navbar-transparent');
              }
          });
      });
  }
}
