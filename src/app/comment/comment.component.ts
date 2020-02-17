import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentsService } from '../_services';
import { Globals } from '../app.global';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [ Globals ]
})
export class CommentComponent implements OnInit {

  tram_num: any;
  inc_id: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private incidentsService: IncidentsService,
    private global: Globals,

  ) { }

  ngOnInit() {
    this.tram_num = this.activatedRoute.snapshot.params['tramNum']
    this.inc_id = this.activatedRoute.snapshot.params['incId']
    console.log(this.tram_num)
    console.log(this.inc_id)
  }

  navigateToTram(){
    this.router.navigate(["/tram/" + this.tram_num]);
  }

  submitComment(comment){
    this.incidentsService.submitComment(this.global.baseAPIUrl + '/incidentComment', this.inc_id, comment).subscribe()
    this.navigateToTram()
  }

}
