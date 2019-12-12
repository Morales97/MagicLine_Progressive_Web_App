import { Component, OnInit } from "@angular/core";
import { AuthService, ChecksService } from '../_services';

@Component({
  selector: "app-checks",
  templateUrl: "./checks.component.html",
  styleUrls: ["./checks.component.scss"]
})

export class ChecksComponent implements OnInit {

  currentUser: any;
  tram: any;
  testAPIresult: Object;

  constructor(private authService: AuthService, private checksService: ChecksService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.tram = this.currentUser
    
    this.checksService.getAPIdata().subscribe(data => {
      this.testAPIresult = data
      console.log(this.testAPIresult)
    })
    
  }
}
