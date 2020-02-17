import { Component, OnInit } from '@angular/core';
import { IncidentsService, ExportService } from '../_services';
import { Globals } from '../app.global';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ Globals ]
})
export class AdminComponent implements OnInit {

  incidentsList: any;

  constructor(
    private incidentsServices: IncidentsService, 
    private global : Globals,
    private router: Router,
    private exportService: ExportService, 
    ) { }

  ngOnInit() {
    this.getIncidentsList()
  }

  getIncidentsList(){
    this.incidentsServices.getAllIncidents(this.global.baseAPIUrl + '/incidents').subscribe(data => {
      this.incidentsList = data;
      console.log (this.incidentsList);
    })
  }

  navigateToTram(tram_num){
    this.router.navigate(["/tram/" + tram_num]);
  }

  exportIncidents(){
    this.exportService.exportExcel(this.incidentsList, "Incidències_MagicLine")
  }

}
