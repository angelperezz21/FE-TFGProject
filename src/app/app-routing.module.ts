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
import { HistorialPerfilComponent } from './components/perfil/historial-perfil/historial-perfil.component';
import { PantallaInicialComponent } from './components/pantalla-inicial/pantalla-inicial.component';
import { VerDonacionComponent } from './components/donacion/ver-donacion/ver-donacion.component';
import { CrearEditarRecursoComponent } from './components/recurso/crear-editar-recurso/crear-editar-recurso.component';
import { CrearEditarNecesitaComponent } from './components/necesita/crear-editar-necesita/crear-editar-necesita.component';
import { ExplorarComponent } from './components/explorar/explorar.component';

const routes: Routes = [
  {path: '', redirectTo: 'Inicio', pathMatch: 'full' },
  {path: 'Inicio', component: PantallaInicialComponent},
  {path:'InicioSesion', component: LoginComponent},
  {path:'Registro', component: RegistroComponent},
  {path:'ListaBeneficiarios', component: ListarBeneficiariosComponent},
  {path:'ListaEmpresas', component: ListarEmpresasComponent},
  {path:'ListaDonaciones', component: ListarDonacionesComponent},
  {path:'Explorar', component: ExplorarComponent},
  {path:'Beneficiario/:id', component: VerBeneficiarioComponent},
  {path:'Empresa/:id', component: VerEmpresaComponent},
  {path:'Donacion', component: VerDonacionComponent},
  {path:'Recurso', component: CrearEditarRecursoComponent},
  {path:'Necesita', component: CrearEditarNecesitaComponent},
  {path:'MiPerfil/:id', component: VerPerfilComponent},
  {path:'HistorialDonaciones/:id', component: HistorialPerfilComponent},
  { path: '**',  redirectTo: 'Inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
