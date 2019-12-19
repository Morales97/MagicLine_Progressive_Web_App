import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  usersList: any;
  tramsList: any; 

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getUsersList();
    this.getTramsList();
  }

  getUsersList() {
    this.adminService.getUsers().subscribe(data => {
      this.usersList = data
    })
  }

  getTramsList() {
    this.adminService.getTrams().subscribe(data => {
      this.tramsList = data
    })
  }

}
