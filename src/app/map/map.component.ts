import { Component, OnInit } from '@angular/core';
import { Globals } from '../app.global';
import { AdminService } from '../_services';
import * as L from 'leaflet';

var marker = L.Icon.extend({
    options: {
        //shadowUrl: 'icon.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

var greenMarker = new marker({iconUrl: 'assets/green-icon.png'}),
    redMarker = new marker({iconUrl: 'assets/red-icon.png'}),
    orangeMarker = new marker({iconUrl: 'assets/orange-icon.png'});


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ Globals ]
})

export class MapComponent implements OnInit {

  tramsList: any;

  constructor(private adminService: AdminService, private global : Globals) { }

  ngOnInit() {
    const map = L.map('map').setView([41.3887,2.1589], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.getTramsList();

    /*for (let tram in this.tramsList){
      console.log (tramsList.get);
    }*/

    //error: tramsList not iterable -- si arreglem això el mapa ja estaria
    /*for (let tram of this.tramsList){
      if (tram.status == "CLOSED"){
        L.marker([tram.lat,tram.long], {icon: redMarker}).addTo(map);
      }
      else{
        L.marker([tram.lat,tram.long], {icon: greenMarker}).addTo(map);
      }*/
  }
    getTramsList() {
      this.adminService.getTrams(this.global.baseAPIUrl + '/trams').subscribe(data => {
      this.tramsList = data;
      })
    }
}
