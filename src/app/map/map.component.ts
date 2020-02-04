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


  afterInit() {
    const map = L.map('map').setView([41.3887,2.1589], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //Tram1
    var pointA = new L.LatLng(41.4626, 2.1730);
    var pointB = new L.LatLng(41.4549, 2.1752);
    var pointC = new L.LatLng (41.4321, 2.1708);
    var pointD = new L.LatLng (41.4247, 2.1659);
    var pointList = [pointA, pointB, pointC, pointD];

    if(this.tramsList[0].state == "CLOSED"){
      var color_state = 'red'
    }
    else if(this.tramsList[0].state == "OPEN"){
      var color_state = 'green'
    }
    else{
      var color_state = 'orange'
    }

    new L.Polyline(pointList, {
        color: color_state,
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    }).addTo(map);

    //Tram2
    pointA = new L.LatLng(41.4123, 2.1650);
    pointB = new L.LatLng(41.4075, 2.1581);
    pointC = new L.LatLng(41.4192, 2.1616);
    pointD = new L.LatLng (41.4198, 2.1466);
    var pointE = new L.LatLng (41.390205,  2.154007);
    var pointF = new L.LatLng (41.422501, 2.118611);
    var pointList = [pointA, pointB, pointC, pointD, pointE, pointF];

    if(this.tramsList[1].state == "CLOSED"){
      var color_state = 'red'
    }
    else if(this.tramsList[1].state == "OPEN"){
      var color_state = 'green'
    }
    else{
      var color_state = 'orange'
    }

    new L.Polyline(pointList, {
        color: color_state,
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    }).addTo(map);

  }


  getTramsList() {
    this.adminService.getTrams(this.global.baseAPIUrl + '/trams').subscribe(data => {
      this.tramsList = data;
      console.log(this.tramsList[0].state)
      this.afterInit()
    })
  }
}
