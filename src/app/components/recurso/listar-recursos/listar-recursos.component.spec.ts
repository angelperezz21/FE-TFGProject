import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRecursosComponent } from './listar-recursos.component';

describe('ListarRecursosComponent', () => {
  let component: ListarRecursosComponent;
  let fixture: ComponentFixture<ListarRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRecursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
