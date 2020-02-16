import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  tram_num: any;
  inc_id: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
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

}
