import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CategoriaValue { 
    static values = [
      { id: 1, name: 'Alimentación' },
      { id: 2, name: 'Artes Gráficas' },
      { id: 3, name: 'Educación' },
      { id: 4, name: 'Construcción' },
      { id: 5, name: 'Electrónica' },
      { id: 6, name: 'Fabricantes' },
      { id: 7, name: 'Madera-Mueble' },
      { id: 8, name: 'Maquinaria' },
      { id: 9, name: 'Salud' },
      { id: 10, name: 'Química' },
      { id: 11, name: 'Servicios' },
      { id: 12, name: 'Textil-Moda' },
      { id: 13, name: 'Transporte' },
      { id: 14, name: 'Turismo-Ocio' },
      ];
}
