import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListarRecursosService {
  @Output() disparador = new EventEmitter<any>();
  constructor() { }
}
