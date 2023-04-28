import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule }from '@auth0/angular-jwt'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VerDonacionComponent } from './components/donacion/ver-donacion/ver-donacion.component';
import { ListarDonacionesComponent } from './components/donacion/listar-donaciones/listar-donaciones.component';
import { VerRecursoComponent } from './components/recurso/ver-recurso/ver-recurso.component';
import { ListarRecursosComponent } from './components/recurso/listar-recursos/listar-recursos.component';
import { CrearEditarRecursoComponent } from './components/recurso/crear-editar-recurso/crear-editar-recurso.component';
import { CrearEditarNecesitaComponent } from './components/necesita/crear-editar-necesita/crear-editar-necesita.component';
import { ListarNecesitaComponent } from './components/necesita/listar-necesita/listar-necesita.component';
import { VerNecesitaComponent } from './components/necesita/ver-necesita/ver-necesita.component';
import { VerPerfilComponent } from './components/perfil/ver-perfil/ver-perfil.component';
import { HistorialPerfilComponent } from './components/perfil/historial-perfil/historial-perfil.component';
import { EditarPerfilComponent } from './components/perfil/editar-perfil/editar-perfil.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    VerDonacionComponent,
    ListarDonacionesComponent,
    VerRecursoComponent,
    ListarRecursosComponent,
    CrearEditarRecursoComponent,
    CrearEditarNecesitaComponent,
    ListarNecesitaComponent,
    VerNecesitaComponent,
    VerPerfilComponent,
    HistorialPerfilComponent,
    EditarPerfilComponent,
    ListarSeguidosComponent,
    VerEmpresaComponent,
    ListarEmpresasComponent,
    ListarBeneficiariosComponent,
    VerBeneficiarioComponent,
    PantallaInicialComponent,
    NavBarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    JwtModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
