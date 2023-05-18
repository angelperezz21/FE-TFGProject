import { TestBed } from '@angular/core/testing';

import { VigilanteEmpresaGuard } from './vigilante-empresa.guard';

describe('VigilanteEmpresaGuard', () => {
  let guard: VigilanteEmpresaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VigilanteEmpresaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
