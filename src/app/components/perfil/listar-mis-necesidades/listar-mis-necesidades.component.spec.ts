import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMisNecesidadesComponent } from './listar-mis-necesidades.component';

describe('ListarMisNecesidadesComponent', () => {
  let component: ListarMisNecesidadesComponent;
  let fixture: ComponentFixture<ListarMisNecesidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMisNecesidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMisNecesidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
