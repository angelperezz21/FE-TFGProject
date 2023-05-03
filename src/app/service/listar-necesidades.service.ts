import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListarNecesidadesService {
  @Output() disparador = new EventEmitter<any>();
  constructor() { }
}
