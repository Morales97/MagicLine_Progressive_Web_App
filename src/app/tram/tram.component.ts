import { Component, OnInit } from "@angular/core";
import { AuthService, TramService, IncidentsService } from '../_services';
import { Globals } from '../app.global';
import { PushNotificationsService} from 'ng-push';
import { Router, ActivatedRoute } from '@angular/router';

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
  numIncidents: any;

  constructor(
    private authService: AuthService,
    private tramService: TramService,
    private incidentsService: IncidentsService,
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
      this.getIncidents();
    })
    console.log(this.tram);
  }

  getOwnTram(){
    this.tramService.getOwnTram(this.global.baseAPIUrl + '/ownTram').subscribe(data =>{
      this.tram = data
      this.getIncidents();
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
    if (confirm("Estas segur que vols tancar el tram? Seràs redirigit a l'enquesta")) {
      this.tramService.closeTram(this.global.baseAPIUrl + '/closeTram', this.tram.num).subscribe(data => {
        this.tram = data
      });
      window.location.href = "https://forms.office.com/Pages/ResponsePage.aspx?id=c78H_RPye0qMTgp1PpeBq_E6ufrcqs9Ol2w-QD6b-oFUNlJVOE1RM0VHTVNNMlNERlg4SkdPTDhIRi4u";
      //alert("Fes l'enquesta: https://forms.office.com/Pages/ResponsePage.aspx?id=c78H_RPye0qMTgp1PpeBq_E6ufrcqs9Ol2w-QD6b-oFUNlJVOE1RM0VHTVNNMlNERlg4SkdPTDhIRi4u");

    }
  }

  navigateToIncidentForm(){
    this.router.navigate(["/incidents/" + this.tram.num]);
  }

  navigateToCommentForm(inc_id){
    this.router.navigate(["/comment/" + this.tram.num + '/' + inc_id])
  }

  getIncidents(){
    this.incidentsService.getIncident(this.global.baseAPIUrl + '/incidentsTram', this.tram.num).subscribe(data => {
      this.incidents = data;
      this.numIncidents = this.incidents.length;
    })
  }

  solveIncident(inc){
    console.log(inc._id)
    this.incidentsService.solveIncident(this.global.baseAPIUrl + '/incidentSolve', inc._id).subscribe()
    this.getIncidents()
  }

  changeMat(){
    this.tramService.changeMaterial(this.global.baseAPIUrl + '/material', this.tram.num).subscribe(data => {
      this.tram = data
    });
  }

  changeAvit(){
    this.tramService.changeAvituallament(this.global.baseAPIUrl + '/avituallament', this.tram.num).subscribe(data => {
      this.tram = data
    });
  }
}
