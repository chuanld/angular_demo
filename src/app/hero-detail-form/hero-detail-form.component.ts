import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FormBuilder } from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero-detail-form',
  templateUrl: './hero-detail-form.component.html',
  styleUrls: ['./hero-detail-form.component.css'],
})
export class HeroDetailFormComponent implements OnInit {
  heroes: Hero[] = [];
  @Input() onEdit;
  @Output() isClickSubmit = new EventEmitter<Hero>();
  constructor(
    private heroService: HeroService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  abilities = [
    'Controll Time',
    'Creator-Tech',
    'Recovery Power',
    'Fast-Sensitive',
    'Clever',
    'Invisible',
  ];
  infoHeroForm = this.formBuilder.group({
    name: '',
    ability: '',
    attack: '',
    defence: '',
  });

  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (!this.infoHeroForm.valid) return this.log('Form invalid');
    const infHero = this.infoHeroForm.value;
    // console.log(this.infoHeroForm.value);
    // this.heroService.addHero(infHero).subscribe((hero) => {
    //   this.heroes.push(hero);
    // });
    this.isClickSubmit.emit(infHero);
    this.infoHeroForm.reset();
  }
  newHero() {
    //this.
  }
  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value;
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  // add(form: any): void {
  //   if (!form) {
  //     return;
  //   }
  //   this.heroService.addHero({ form } as any).subscribe((hero) => {
  //     this.heroes.push(hero);
  //   });
  // }
  // onSubmitEdit() {
  //   console.log(123112);
  // }
  ngOnInit(): void {}
}
