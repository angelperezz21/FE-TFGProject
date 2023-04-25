import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBeneficiariosComponent } from './listar-beneficiarios.component';

describe('ListarBeneficiariosComponent', () => {
  let component: ListarBeneficiariosComponent;
  let fixture: ComponentFixture<ListarBeneficiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarBeneficiariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
