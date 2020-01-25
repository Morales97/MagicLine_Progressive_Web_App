import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

var marker = L.Icon.extend({
    options: {
        shadowUrl: 'icon.png',
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
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const map = L.map('map').setView([41.3887,2.1589], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([41.3887,2.1589], {icon: greenMarker}).addTo(map);
  }
}
