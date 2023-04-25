import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarNecesitaComponent } from './listar-necesita.component';

describe('ListarNecesitaComponent', () => {
  let component: ListarNecesitaComponent;
  let fixture: ComponentFixture<ListarNecesitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarNecesitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarNecesitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
