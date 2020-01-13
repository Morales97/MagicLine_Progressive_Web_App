import { Component, OnInit } from "@angular/core";
import { AuthService, TramService } from '../_services';
import { Globals } from '../app.global';

@Component({
  selector: "app-checks",
  templateUrl: "./tram.component.html",
  styleUrls: ["./tram.component.scss"], 
  providers: [ Globals ]
})

export class TramComponent implements OnInit {

  currentUser: any;
  tram: any;


  constructor(
    private authService: AuthService, 
    private tramService: TramService,
    private global: Globals
    ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue
    this.getOwnTram();
  }

  getOwnTram(){
    this.tramService.getOwnTram(this.global.baseAPIUrl + '/ownTram').subscribe(data =>{
      this.tram = data
      console.log(data)
    })
  }

  openTram(){
    this.tramService.openTram(this.global.baseAPIUrl + '/openTram', this.tram.num).subscribe(data => {
      this.tram = data
    });
  }

  closeTram(){
    this.tramService.closeTram(this.global.baseAPIUrl + '/closeTram', this.tram.num).subscribe(data => {
      this.tram = data
    });
  }
}
