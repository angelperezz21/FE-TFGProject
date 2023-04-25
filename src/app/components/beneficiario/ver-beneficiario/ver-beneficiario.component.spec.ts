import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBeneficiarioComponent } from './ver-beneficiario.component';

describe('VerBeneficiarioComponent', () => {
  let component: VerBeneficiarioComponent;
  let fixture: ComponentFixture<VerBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerBeneficiarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
