import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailFormComponent } from './hero-detail-form.component';

describe('HeroDetailFormComponent', () => {
  let component: HeroDetailFormComponent;
  let fixture: ComponentFixture<HeroDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
