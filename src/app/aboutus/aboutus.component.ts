import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  data : Date = new Date();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('home-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
}
