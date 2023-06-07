//  <Aplicación destinada a facilitar la colaboraciñón entre Empresas y ONGs>
//   Copyright (C) <2023>  <Ángel Pérez Martín>

//   This program is free software: you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.

//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.

//   You should have received a copy of the GNU General Public License
//   along with this program.  If not, see <https://www.gnu.org/licenses/>. 
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
