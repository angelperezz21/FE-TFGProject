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
        { id: 2, name: 'Ropa' },
        { id: 3, name: 'Educación' },
        { id: 4, name: 'Calzado' },
        { id: 5, name: 'Tecnología' },
        { id: 6, name: 'Salud' },
      ];
}
