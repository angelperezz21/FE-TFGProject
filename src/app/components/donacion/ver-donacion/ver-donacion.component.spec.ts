import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDonacionComponent } from './ver-donacion.component';

describe('VerDonacionComponent', () => {
  let component: VerDonacionComponent;
  let fixture: ComponentFixture<VerDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDonacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
