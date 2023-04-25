import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPerfilComponent } from './historial-perfil.component';

describe('HistorialPerfilComponent', () => {
  let component: HistorialPerfilComponent;
  let fixture: ComponentFixture<HistorialPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
