import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/heros.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  iniciar: boolean;

  constructor(
    private heroService: HeroService
  ) {  }

  ngOnInit() {
    this.heroService.getHero('hulk').subscribe( result => console.log(result))
  }


}
