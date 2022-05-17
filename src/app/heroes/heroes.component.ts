import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Ability } from '../ability';
import { AbilityService } from '../ability.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  abilities: Ability[] = [];
  onEdit: boolean = false;

  constructor(
    private heroService: HeroService,
    private abilityService: AbilityService
  ) {}

  onEditHero(): void {
    this.onEdit = !this.onEdit;
  }
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    localStorage.setItem(
      'heroes',
      JSON.stringify(
        this.heroService
          .getHeroes()
          .subscribe((heroes) => (this.heroes = heroes))
      )
    );
  }
  // getAbilities(): void {
  //   this.abilityService
  //     .getAbilities()
  //     .subscribe((abilities) => (this.abilities = abilities));
  //   // this.abilityService.saveLocalStorage(this.abilities);
  //   localStorage.setItem(
  //     'abilities',
  //     JSON.stringify(
  //       this.abilityService
  //         .getAbilities()
  //         .subscribe((abilities) => (this.abilities = abilities))
  //     )
  //   );
  // }
  getData(): void {
    let dataAbilities = this.abilityService.getAbilities();

    let dataHeroes = this.heroService.getHeroes();

    forkJoin([dataHeroes, dataAbilities]).subscribe(([heroes, abilities]) => {
      this.heroes = heroes;
      localStorage.setItem('heroes', JSON.stringify(heroes));
      this.abilities = abilities;
      localStorage.setItem('abilities', JSON.stringify(abilities));
    });
  }
  clickSubmit(newHero: Hero) {
    this.heroService.addHero(newHero).subscribe((hero) => {
      this.heroes.push(hero);
    });
    this.getHeroes();
  }
  ngOnInit(): void {
    this.getData();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
    localStorage.setItem(
      'heroes',
      JSON.stringify(
        this.heroService
          .getHeroes()
          .subscribe((heroes) => (this.heroes = heroes))
      )
    );
  }
}
