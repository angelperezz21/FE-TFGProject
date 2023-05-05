import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMisRecursosComponent } from './listar-mis-recursos.component';

describe('ListarMisRecursosComponent', () => {
  let component: ListarMisRecursosComponent;
  let fixture: ComponentFixture<ListarMisRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMisRecursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMisRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
