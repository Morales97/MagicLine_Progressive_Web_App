import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentsService } from '../_services';
import { Globals } from '../app.global';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss'],
  providers: [ Globals ]

})
export class IncidentsComponent implements OnInit {

  tram_num: any;
  categoria: any

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private incidentsService: IncidentsService,
    private global: Globals,

  ) { 
    this.categoria = "Lleu"
  }

  ngOnInit() {
    this.tram_num = this.activatedRoute.snapshot.params['num']
  }


  navigateToTram(){
    this.router.navigate(["/tram/" + this.tram_num]);
  }

  updateCategoria(cat){
    this.categoria = cat
  }

  submitForm(desc){
    this.incidentsService.submitNewIncident(this.global.baseAPIUrl + '/incident', desc, this.categoria, this.tram_num).subscribe()
    this.navigateToTram()
  }
}
