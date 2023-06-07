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
import { RouterModule, Routes } from '@angular/router';
import { ListarBeneficiariosComponent } from './components/beneficiario/listar-beneficiarios/listar-beneficiarios.component';
import { ListarEmpresasComponent } from './components/empresa/listar-empresas/listar-empresas.component';
import { VerPerfilComponent } from './components/perfil/ver-perfil/ver-perfil.component';
import { VerEmpresaComponent } from './components/empresa/ver-empresa/ver-empresa.component';
import { VerBeneficiarioComponent } from './components/beneficiario/ver-beneficiario/ver-beneficiario.component';
import { ListarDonacionesComponent } from './components/donacion/listar-donaciones/listar-donaciones.component';
import { ListarRecursosComponent } from './components/recurso/listar-recursos/listar-recursos.component';
import { ListarNecesitaComponent } from './components/necesita/listar-necesita/listar-necesita.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PantallaInicialComponent } from './components/pantalla-inicial/pantalla-inicial.component';
import { CrearEditarRecursoComponent } from './components/recurso/crear-editar-recurso/crear-editar-recurso.component';
import { CrearEditarNecesitaComponent } from './components/necesita/crear-editar-necesita/crear-editar-necesita.component';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { VigilanteGuard } from './service/vigilante.guard';
import { VigilanteEmpresaGuard } from './service/vigilante-empresa.guard';
import { VigilanteBeneficiarioGuard } from './service/vigilante-beneficiario.guard';
import { PrivacidadComponent } from './components/privacidad/privacidad.component';

const routes: Routes = [
  {path: '', redirectTo: 'Inicio', pathMatch: 'full' },
  {path:'Inicio', component: PantallaInicialComponent},
  {path:'InicioSesion', component: LoginComponent},
  {path:'Registro', component: RegistroComponent},
  {path:'ListaBeneficiarios', component: ListarBeneficiariosComponent},
  {path:'ListaEmpresas', component: ListarEmpresasComponent},
  {path:'ListaDonaciones', component: ListarDonacionesComponent, canActivate: [VigilanteGuard]},
  {path:'ListaNecesidades', component: ListarNecesitaComponent},
  {path:'ListaRecursos', component: ListarRecursosComponent},
  {path:'Explorar', component: ExplorarComponent},
  {path:'Beneficiario/:id', component: VerBeneficiarioComponent},
  {path:'Empresa/:id', component: VerEmpresaComponent},
  {path:'Recurso', component: CrearEditarRecursoComponent, canActivate: [VigilanteEmpresaGuard]},
  {path:'Recurso/:id', component: CrearEditarRecursoComponent, canActivate: [VigilanteEmpresaGuard]},
  {path:'Necesita', component: CrearEditarNecesitaComponent, canActivate: [VigilanteBeneficiarioGuard]},
  {path:'Necesita/:id', component: CrearEditarNecesitaComponent, canActivate: [VigilanteBeneficiarioGuard]},
  {path:'MiPerfil/:id', component: VerPerfilComponent, canActivate: [VigilanteGuard]},
  {path:'PoliticasDePrivacidad', component: PrivacidadComponent},
  { path: '**',  redirectTo: 'Inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
