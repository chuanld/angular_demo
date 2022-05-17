import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { Ability } from '../ability';
import { AbilityService } from '../ability.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  // @Input() hero?: Hero;
  hero: Hero | undefined;

  abilities;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private abilityService: AbilityService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    let dataAbilities = this.abilityService.getAbilities();
    const id = Number(this.route.snapshot.paramMap.get('id'));

    let dataHeroes = this.heroService.getHero(id);

    forkJoin([dataHeroes, dataAbilities]).subscribe(([hero, abilities]) => {
      this.hero = hero;

      this.abilities = abilities;
    });
  }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }
  getAbilities(): void {
    this.abilityService
      .getAbilities()
      .subscribe((abilities) => (this.abilities = abilities));
    // this.abilityService.saveLocalStorage(this.abilities);
    // localStorage.setItem(
    //   'abilities',
    //   JSON.stringify(
    //     this.abilityService
    //       .getAbilities()
    //       .subscribe((abilities) => (this.abilities = abilities))
    //   )
    // );
  }

  // onSaveLocal(idHero: Number, nameHero: String): void {
  //   console.log(idHero, nameHero);
  // }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.hero) {
      console.log(this.hero);
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
  selectOption(e: any) {
    // this.hero?.ability  = parseInt(e.target.value)
    // // console.log(typeof e.target.value);
  }
}
