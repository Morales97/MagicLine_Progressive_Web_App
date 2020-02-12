import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services';
import { Globals } from '../app.global';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [ Globals ]
})
export class HomeComponent implements OnInit {

  usersList: any;
  tramsList: any;

  constructor(private adminService: AdminService, private global : Globals) { }

  ngOnInit() {
    this.getUsersList();
    this.getTramsList();
  }

  getUsersList() {
    this.adminService.getUsers(this.global.baseAPIUrl + '/users').subscribe(data => {
      this.usersList = data
    })
  }

  getTramsList() {
    this.adminService.getTrams(this.global.baseAPIUrl + '/trams').subscribe(data => {
      this.tramsList = data
    })
  }
}
