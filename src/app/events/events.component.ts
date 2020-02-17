import { Component, OnInit } from '@angular/core';
import { AuthService, TramService, ExportService} from '../_services';
import { Globals } from '../app.global';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [ Globals ]
})
export class EventsComponent implements OnInit {

  eventsList: any;

  constructor(
    private tramService: TramService, 
    private exportService: ExportService, 
    private global: Globals) { }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents(){
    this.tramService.getEvents(this.global.baseAPIUrl + '/events').subscribe(data => {
      this.eventsList = data;
    });
  }

  exportEvents(){
    this.exportService.exportExcel(this.eventsList, "Registre_Events_MagicLine")
  }
}
