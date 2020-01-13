import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services';
import { Globals } from '../app.global';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ Globals ]
})
export class AdminComponent implements OnInit {

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
