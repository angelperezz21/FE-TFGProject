import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CategoriaONGValue { 
    static values = [
        { id: 1, name: 'Ayuda humanitaria' },
        { id: 2, name: 'Desarrollo humanitario' },
        { id: 3, name: 'Educación' },
        { id: 4, name: 'Salud' },
        { id: 5, name: 'Medio ambiente' },
        { id: 6, name: 'Derechos humanos' },
        { id: 7, name: 'Cooperación internacional' },
        { id: 8, name: 'Emprendimiento social' },
        { id: 9, name: 'Animal' },
      ];
}
