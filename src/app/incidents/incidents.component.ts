import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }


  navigateToTram(){
    this.router.navigate(["/tram"]);
  }
}
