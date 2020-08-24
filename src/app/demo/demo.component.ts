import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})

export class DemoComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
