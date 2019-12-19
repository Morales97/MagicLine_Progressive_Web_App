import { Component, OnInit } from "@angular/core";
import { AuthService, TramService } from '../_services';

@Component({
  selector: "app-checks",
  templateUrl: "./tram.component.html",
  styleUrls: ["./tram.component.scss"]
})

export class TramComponent implements OnInit {

  currentUser: any;
  tram: any;


  constructor(private authService: AuthService, private tramService: TramService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue
    this.getOwnTram();
  }

  getOwnTram(){
    this.tramService.getOwnTram().subscribe(data =>{
      this.tram = data
      console.log(data)
    })
  }

  openTram(){
    this.tramService.openTram(this.tram.num_id).subscribe(data => {
      this.tram = data
    });
  }

  closeTram(){
    this.tramService.closeTram(this.tram.num_id).subscribe(data => {
      this.tram = data
    });
  }
}
