import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  onEdit: boolean = false;

  constructor(private heroService: HeroService) {}

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
  clickSubmit(newHero: Hero) {
    this.heroService.addHero(newHero).subscribe((hero) => {
      this.heroes.push(hero);
    });
    this.getHeroes();
  }
  ngOnChanges(): void {}
  ngOnInit(): void {
    this.getHeroes();
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
