import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services';
import { Globals } from '../app.global';
import { AuthService } from '../_services';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [ Globals ]
})
export class HomeComponent implements OnInit {

  usersList: any;
  tramsList: any;
  isAdmin: any;

  constructor(
    private adminService: AdminService, 
    private global : Globals, 
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.getUsersList();
    this.getTramsList();
    this.authService.isAdmin.subscribe(x => this.isAdmin = x);

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
