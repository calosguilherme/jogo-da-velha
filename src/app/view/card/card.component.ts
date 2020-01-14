import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { Player } from 'src/app/model/player.model';
import { HeroService } from 'src/app/services/heros.service';
import { Score } from 'src/app/model/score.model';

@Component({
  selector: "card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() player:Player
  @Input() startGame:boolean
  @Output() returnHero = new EventEmitter();

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit() {
  }

  getRandomIntInclusive(min:number , max:number):number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  getHero(player: Player){
    this.heroService.getHero(player.heroName).subscribe( hero =>
      { 
        if(hero.data.results.length>0){
        player.heroName = hero.data.results[0].name;
        player.heroImg = hero.data.results[0].thumbnail.path +'.'+hero.data.results[0].thumbnail.extension
        player.ready = true;
        player.wins = 0;
        player.requestFailed = false;
        this.returnHero.emit(player)
      }
      else{
        player.requestFailed = true;
      }
    },
    error =>  player.requestFailed = true
    )
  }


}
