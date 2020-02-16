import { Component, OnInit } from '@angular/core';
import { IncidentsService } from '../_services';
import { Globals } from '../app.global';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ Globals ]
})
export class AdminComponent implements OnInit {

  incidentsList: any;

  constructor(private incidentsServices: IncidentsService, private global : Globals) { }

  ngOnInit() {
    this.getIncidentsList()
  }

  getIncidentsList(){
    this.incidentsServices.getAllIncidents(this.global.baseAPIUrl + '/incidents').subscribe(data => {
      this.incidentsList = data;
      console.log (this.incidentsList);
    })
  }
}
