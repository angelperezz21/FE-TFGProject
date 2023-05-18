import { TestBed } from '@angular/core/testing';

import { VigilanteBeneficiarioGuard } from './vigilante-beneficiario.guard';

describe('VigilanteBeneficiarioGuard', () => {
  let guard: VigilanteBeneficiarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VigilanteBeneficiarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
