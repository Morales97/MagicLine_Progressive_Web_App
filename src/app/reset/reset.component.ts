import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services';
import { Globals } from '../app.global';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  providers: [ Globals ]
})
export class ResetComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private global: Globals,
  ) { }

  ngOnInit() {
  }

  reset(password){
    if(password != "123"){
      confirm("Contrasenya incorrecta")
      return;
    }
    if(confirm("Estas segur que vols fer un reset? Les dades introduides pels coordinadors de tram es perdran i són irrecuperables.")){
      this.adminService.eraseAllData(this.global.baseAPIUrl + '/reset').subscribe()
    }
  }

}
