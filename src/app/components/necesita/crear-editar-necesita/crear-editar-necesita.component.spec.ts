import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarNecesitaComponent } from './crear-editar-necesita.component';

describe('CrearEditarNecesitaComponent', () => {
  let component: CrearEditarNecesitaComponent;
  let fixture: ComponentFixture<CrearEditarNecesitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEditarNecesitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEditarNecesitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
