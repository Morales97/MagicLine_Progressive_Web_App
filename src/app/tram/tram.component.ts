import { Component, OnInit } from "@angular/core";
import { AuthService, TramService } from '../_services';
import { Globals } from '../app.global';
import { PushNotificationsService} from 'ng-push';
import { Router } from '@angular/router';

@Component({
  selector: "app-checks",
  templateUrl: "./tram.component.html",
  styleUrls: ["./tram.component.scss"],
  providers: [ Globals ]
})

export class TramComponent implements OnInit {

  currentUser: any;
  tram: any;
  incidents: any[];
  numIncidents: number;


  constructor(
    private authService: AuthService,
    private tramService: TramService,
    private global: Globals,
    private _pushNotifications: PushNotificationsService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue
    this.getOwnTram();
  }

  getOwnTram(){
    this.tramService.getOwnTram(this.global.baseAPIUrl + '/ownTram').subscribe(data =>{
      this.tram = data
      this.incidents = this.tram.incidents
      this.numIncidents = this.incidents.length;
      console.log(this.tram)
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
    this.router.navigate(["/incidents"]);
  }
}
