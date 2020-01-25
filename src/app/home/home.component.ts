import { Component, OnInit } from "@angular/core";
import {TramService} from "../_services";


declare var ol: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  constructor(
    private tramService: TramService
    ) {}
}
