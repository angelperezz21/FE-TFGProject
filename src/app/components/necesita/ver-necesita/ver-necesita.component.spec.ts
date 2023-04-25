import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerNecesitaComponent } from './ver-necesita.component';

describe('VerNecesitaComponent', () => {
  let component: VerNecesitaComponent;
  let fixture: ComponentFixture<VerNecesitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerNecesitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerNecesitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
