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
//   in the LICENSE.txt file.  If not, see <https://www.gnu.org/licenses/>. 
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule }from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'
import {NgxPaginationModule} from 'ngx-pagination';
import { TooltipModule } from 'ng2-tooltip-directive';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ListarDonacionesComponent } from './components/donacion/listar-donaciones/listar-donaciones.component';
import { ListarRecursosComponent } from './components/recurso/listar-recursos/listar-recursos.component';
import { CrearEditarRecursoComponent } from './components/recurso/crear-editar-recurso/crear-editar-recurso.component';
import { CrearEditarNecesitaComponent } from './components/necesita/crear-editar-necesita/crear-editar-necesita.component';
import { ListarNecesitaComponent } from './components/necesita/listar-necesita/listar-necesita.component';
import { VerPerfilComponent } from './components/perfil/ver-perfil/ver-perfil.component';
import { ListarSeguidosComponent } from './components/perfil/listar-seguidos/listar-seguidos.component';
import { VerEmpresaComponent } from './components/empresa/ver-empresa/ver-empresa.component';
import { ListarEmpresasComponent } from './components/empresa/listar-empresas/listar-empresas.component';
import { ListarBeneficiariosComponent } from './components/beneficiario/listar-beneficiarios/listar-beneficiarios.component';
import { VerBeneficiarioComponent } from './components/beneficiario/ver-beneficiario/ver-beneficiario.component';
import { PantallaInicialComponent } from './components/pantalla-inicial/pantalla-inicial.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { ListarMisRecursosComponent } from './components/perfil/listar-mis-recursos/listar-mis-recursos.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { ListarMisNecesidadesComponent } from './components/perfil/listar-mis-necesidades/listar-mis-necesidades.component';
import { PrivacidadComponent } from './components/privacidad/privacidad.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ListarDonacionesComponent,
    ListarRecursosComponent,
    CrearEditarRecursoComponent,
    CrearEditarNecesitaComponent,
    ListarNecesitaComponent,    
    VerPerfilComponent,
    ListarSeguidosComponent,
    VerEmpresaComponent,
    ListarEmpresasComponent,
    ListarBeneficiariosComponent,
    VerBeneficiarioComponent,
    PantallaInicialComponent,
    NavBarComponent,
    FooterComponent,
    ModalComponent,
    ExplorarComponent,
    ListarMisRecursosComponent,
    FiltroComponent,
    ListarMisNecesidadesComponent,
    PrivacidadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    JwtModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
