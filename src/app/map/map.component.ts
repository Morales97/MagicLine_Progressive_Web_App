import { Component, OnInit } from '@angular/core';
import { Globals } from '../app.global';
import { AdminService } from '../_services';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ Globals ]
})

export class MapComponent implements OnInit {

  tramsList: any;

  constructor(private adminService: AdminService, private global : Globals) { }

  ngOnInit(){
      this.getTramsList();

  }

  afterInit(){
    const map = L.map('map').setView([41.3887,2.1589], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    for (let tram of this.tramsList){

      if(tram.state == "Tancat"){
        var color_state = 'red'
      }
      else if(tram.state == "Obert"){
        var color_state = 'green'
      }
      else{
        var color_state = 'yellow'
      }
      var line = new L.Polyline(tram.pointList, {
        color: color_state,
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
      }).addTo(map);
  }
}


  getTramsList() {
    this.adminService.getTrams(this.global.baseAPIUrl + '/trams').subscribe(data => {
      this.tramsList = data;
      this.afterInit()
    })
  }
}
