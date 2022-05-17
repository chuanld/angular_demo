import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FormBuilder } from '@angular/forms';
import { MessageService } from '../message.service';
import { Ability } from '../ability';

@Component({
  selector: 'app-hero-detail-form',
  templateUrl: './hero-detail-form.component.html',
  styleUrls: ['./hero-detail-form.component.css'],
})
export class HeroDetailFormComponent implements OnInit {
  heroes: Hero[] = [];
  @Input() onEdit;
  @Output() isClickSubmit = new EventEmitter<Hero>();
  @Input() abilities?: Array<Ability>;
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  Abilities = [
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
    console.log(this.abilities);
    this.isClickSubmit.emit(infHero);
    this.infoHeroForm.reset();
  }

  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value;
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  ngOnInit(): void {
    console.log(this.abilities);
  }
}
