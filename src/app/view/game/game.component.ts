import { Component, OnInit } from "@angular/core";
import { Player } from 'src/app/model/player.model';
import { HeroService } from 'src/app/services/heros.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { flip } from 'ng-animate';

@Component({
  selector: "game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
  animations: [
    trigger('flip', [transition('* => *', useAnimation(flip))])
  ],
})
export class GameComponent implements OnInit {
  public board: Array<number> = [null,null,null,null,null,null,null,null,null,]
  public players: Array<Player> = [new Player(), new Player()]
  public startGame: boolean = false;
  public draw: number = 0;
  public winner: number;
  public endRound: boolean;
  public lastPlayer: number = 1;
  flip: any;

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

  allReady(){
    let random: number;
    if(this.players[0].ready && this.players[1].ready){
      random = this.getRandomIntInclusive(0,1);
      this.players[0].isPlayOne = (random == 1 ? true : false);
      this.players[1].isPlayOne = !this.players[0].isPlayOne;
      this.startGame = true;
    }
  }

  reset(){
    this.board = [null,null,null,null,null,null,null,null,null,]
    this.startGame = true;
    this.endRound = false;
    this.lastPlayer = 1;
    document.getElementById('board').classList.remove('velha');
  }

  equalSquare(squareA:number, squareB:number, squareC:number):boolean {
    let _board = this.board
    if(_board[squareA] == _board[squareB] && _board[squareA] == _board[squareC] && _board[squareA] != null){
      this.winner = _board[squareA];
      document.getElementById('sq'+squareA).classList.add('winner');
      document.getElementById('sq'+squareB).classList.add('winner');
      document.getElementById('sq'+squareC).classList.add('winner');
      this.players.find(player => player.isPlayOne == (_board[squareA]==1 ? true : false)).wins+=1;

      return true
    }
  }

  select(i:number){
    if(!this.endRound && this.startGame && this.board[i] == null){
      this.board[i] = this.lastPlayer
      this.lastPlayer = this.lastPlayer == 1 ? 0 : 1;
      setTimeout(_ => {this.end();});

    }
  }

  end(){
    if(this.equalSquare(0, 1, 2) || this.equalSquare(3, 4, 5) || this.equalSquare(6, 7, 8) 
    || this.equalSquare(0, 3, 6) || this.equalSquare(1, 4, 7) || this.equalSquare(2, 5, 8)
    || this.equalSquare(0, 4, 8) || this.equalSquare(2, 4, 6)){
      this.endRound = true;
      this.lastPlayer= -1;
    }
    else if(this.board.filter(square => square == null).length==0){
      this.endRound = true;
      this.draw +=1;
      this.lastPlayer= -1;
      this.winner = -1
      document.getElementById('board').classList.add('velha');
    }
  }

  getWinner(){
    return(this.players.find(player => (player.isPlayOne ? 1: 0) == this.winner).heroName)
  }

}
