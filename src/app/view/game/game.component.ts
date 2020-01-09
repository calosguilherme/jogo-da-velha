import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  public board: Array<string> = [null,null,null,null,null,null,null,null,null,]
  constructor(
  ) { }

  ngOnInit() {
  }

}
