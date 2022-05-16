import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
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
        ability: 'Controll Time',
      },
      {
        id: 22,
        name: 'IronMan',
        ability: 'Creator - Tech',
      },
      {
        id: 33,
        name: 'Hulk',
        ability: 'Recovery Power',
      },
      {
        id: 44,
        name: 'Spider',
        ability: 'Fast-Sensitive',
      },
      {
        id: 55,
        name: 'Captain',
        ability: 'Clever',
      },
    ];
    const getLocalStored = JSON.parse(localStorage.getItem('heroes') || '[]');
    const storedHeroes = getLocalStored.length != 0 ? getLocalStored : heroes;

    return { storedHeroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 10
      : 11;
  }
}
