import { Component, OnInit } from "@angular/core";
import { AuthService, TramService } from '../_services';
import { Globals } from '../app.global';
import { PushNotificationsService} from 'ng-push';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentsServices } from '../_services';

@Component({
  selector: "app-checks",
  templateUrl: "./tram.component.html",
  styleUrls: ["./tram.component.scss"],
  providers: [ Globals ]
})

export class TramComponent implements OnInit {

  currentUser: any;
  isAdmin: any;
  tram: any;
  incidents: any;
  numIncidents: number;


  constructor(
    private authService: AuthService,
    private tramService: TramService,
    private incidentsServices: IncidentsServices,
    private global: Globals,
    private _pushNotifications: PushNotificationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.authService.isAdmin.subscribe(x => this.isAdmin = x);
    if(this.isAdmin){
      this.getTram(this.activatedRoute.snapshot.params['num'])
    } else {
      this.getOwnTram();
    }
  }

  getTram(tram_num){
    this.tramService.getTram(this.global.baseAPIUrl + '/trams', tram_num).subscribe(data =>{
      this.tram = data
      this.getIncident();
      this.numIncidents = this.incidents.length;
    })
    console.log(this.tram);
  }

  getOwnTram(){
    this.tramService.getOwnTram(this.global.baseAPIUrl + '/ownTram').subscribe(data =>{
      this.tram = data
      this.getIncident();
      this.numIncidents = this.incidents.length;
    })
  }

  openTram(){
    this.tramService.openTram(this.global.baseAPIUrl + '/openTram', this.tram.num).subscribe(data => {
      this.tram = data
    });
  }

  pasEscombra(){
    this.tramService.pasEscombra(this.global.baseAPIUrl + '/escombra', this.tram.num).subscribe(data => {
      this.tram = data
    });
  }

  closeTram(){
    this.tramService.closeTram(this.global.baseAPIUrl + '/closeTram', this.tram.num).subscribe(data => {
      this.tram = data
    });
    this.notify();
  }

  notify(){ //our function to be called on click
    let options = { //set options
      body: "Tram tancat, fes l'enquesta: https://forms.office.com/Pages/ResponsePage.aspx?id=c78H_RPye0qMTgp1PpeBq_E6ufrcqs9Ol2w-QD6b-oFUNlJVOE1RM0VHTVNNMlNERlg4SkdPTDhIRi4u",
    }
     this._pushNotifications.create('CLOSED', options).subscribe( //creates a notification
        res => console.log(res),
        err => console.log(err)
    );
  }

  navigateToDetails(){
    this.router.navigate(["/incidents/" + this.tram.num]);
  }

  getIncident(){
    this.incidentsServices.getIncident(this.global.baseAPIUrl + '/incidentsTram', this.tram.num).subscribe(data => {
      this.incidents = data;
      console.log (this.incidents);
    })
  }

  changeState(inc_id){
    console.log (inc_id);
    this.incidentsServices.solveIncident(this.global.baseAPIUrl + '/incidentSolve', inc_id)
    this.incidents = this.getIncident();
  }
}
