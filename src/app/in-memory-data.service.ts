import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ability } from './ability';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: any = [
      {
        id: 11,
        name: 'Dr.Strange',
        ability: 1,
      },
      {
        id: 22,
        name: 'IronMan',
        ability: 2,
      },
      {
        id: 33,
        name: 'Hulk',
        ability: 3,
      },
      {
        id: 44,
        name: 'Spider',
        ability: 4,
      },
      {
        id: 55,
        name: 'Captain',
        ability: 5,
      },
    ];
    const getLocalStored = JSON.parse(localStorage.getItem('heroes') || '[]');
    const storedHeroes = getLocalStored.length != 0 ? getLocalStored : heroes;

    const abilities: any = [
      {
        id: 1,
        skill: 'Controll Time',
      },
      {
        id: 2,
        skill: 'Creator - Tech',
      },
      {
        id: 3,
        skill: 'Recovery Power',
      },
      {
        id: 4,
        skill: 'Fast-Sensitive',
      },
      {
        id: 5,
        skill: 'Clever',
      },
      {
        id: 6,
        skill: 'Rocker',
      },
      {
        id: 7,
        skill: 'Control The Elements',
      },
      {
        id: 8,
        skill: 'Storm',
      },
    ];
    const getLocalStoredAbilities = JSON.parse(
      localStorage.getItem('abilities') || '[]'
    );
    const storedAbilities =
      getLocalStoredAbilities.length != 0 ? getLocalStoredAbilities : abilities;

    return { storedHeroes, storedAbilities };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 10
      : 11;
  }
  genIdAbility(abilities: Ability[]): Number {
    return abilities.length > 0
      ? Math.max(...abilities.map((ability) => ability.id)) + 1
      : 1;
  }
}
