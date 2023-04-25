import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSeguidosComponent } from './listar-seguidos.component';

describe('ListarSeguidosComponent', () => {
  let component: ListarSeguidosComponent;
  let fixture: ComponentFixture<ListarSeguidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSeguidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSeguidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
