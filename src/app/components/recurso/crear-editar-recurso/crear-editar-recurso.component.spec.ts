import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarRecursoComponent } from './crear-editar-recurso.component';

describe('CrearEditarRecursoComponent', () => {
  let component: CrearEditarRecursoComponent;
  let fixture: ComponentFixture<CrearEditarRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEditarRecursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEditarRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
