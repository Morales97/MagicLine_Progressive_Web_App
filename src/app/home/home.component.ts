import { Component, OnInit } from "@angular/core";
import {TramService} from "../_services";


declare var ol: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(    
    private tramService: TramService
    ) {}

  map: any;

  lonLat(x, y) {
    return ol.proj.fromLonLat([x, y]);
    // return new ol.proj.fromLonLat([x, y]);
  }

  // aquest botó és per fer testing de que desde el mòbil si que respon bé a una API HTTPS
  onClick(){
    this.tramService.getAPIdata().subscribe(
      data => {
        console.log(data)
      }
    )
  }
  
  ngOnInit() {
    this.map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: this.lonLat(2.146,41.4),
        zoom: 12
      })
    });
  
  
    /*
    var markers = new ol.Layers.Markers( "Markers" );
    this.map.addLayer(markers);

    var size = [21, 25];
    console.log(size);
    //var offset = new ol.Pixel(-(size[0]/2), -size[1]);
    var offset = [0, 0];
    var icon = new Icon(
      "http://www.google.com/mapfiles/marker.png",
      size,
      offset
    );*/
    //markers.addMarker(new ol.Marker(this.lonLat(2.1460, 41.4000), icon.clone()));
    // markers.addMarker(new ol.Marker(new ol.fromLonLat(2.1460, 41.4000), icon.clone()));

    /*
    var camio = new Feature({
      geometry: new Point(this.lonLat(2.146, 41.4))
    });
    camio.setStyle(
      new ol.style.Style({
        image: new Icon({
          src: '../../../images/marker.png'
        })
      })
    );

    var vectorSource = new VectorSource({
      features: [camio]
    });

    var vectorLayer = new VectorLayer({
      source: vectorSource
    });
*/

  }
}
