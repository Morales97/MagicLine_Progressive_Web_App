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

  afterInit(avituallaments){
    var map = L.map('map').setView([41.3887,2.1589], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoiZGFuaS1tb3JhbGVzIiwiYSI6ImNrNmo5ZW9lYjA2d2czbHAxcmJraGExajYifQ.zPNk-ypzqGXhGtHjt0DofQ'
    }).addTo(map);

    for (let tram of this.tramsList){

      if(tram.state == "Tancat"){
        var color_state = 'rgb(240, 50, 50)'  // Vermell
      }
      else if(tram.state == "Obert"){
        var color_state = 'rgb(30, 200, 20)'  // Verd
      }
      else{
        var color_state = 'yellow'
      }
      var line = new L.Polyline(tram.pointList, {
        color: color_state,
        weight: 5,
        opacity: 0.8,
        smoothFactor: 0.5
      }).addTo(map);
      line.bindPopup("<b>" + tram.num + " - " + tram.name + "</b><br>" + tram.state)

      var greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      var redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      if(avituallaments){
        if (tram.avituallament){
          if (!tram.avituallament_rebut) {
            var marker = new L.marker(tram.pointList[0], {icon: redIcon}).addTo(map);
            marker.bindPopup("<b>" + tram.num + " - " + tram.name + "</b><br>Avituallament no rebut")
          }
          if (tram.avituallament_rebut) { 
            var marker = new L.marker(tram.pointList[0], {icon: greenIcon}).addTo(map);
            marker.bindPopup("<b>" + tram.num + " - " + tram.name + "</b><br>Avituallament rebut!")
          }
        }
      } else {
        if (!tram.material_rebut) {
          var marker = new L.marker(tram.pointList[0], {icon: redIcon}).addTo(map);
          marker.bindPopup("<b>" + tram.num + " - " + tram.name + "</b><br>Material no rebut")
        }
        if (tram.material_rebut) { 
          var marker = new L.marker(tram.pointList[0], {icon: greenIcon}).addTo(map);
          marker.bindPopup("<b>" + tram.num + " - " + tram.name + "</b><br>Material rebut!")
        }
      }
    }
  }
  
  getTramsList() {
    this.adminService.getTrams(this.global.baseAPIUrl + '/trams').subscribe(data => {
      this.tramsList = data;
      this.afterInit(false)
    })
  }
}
