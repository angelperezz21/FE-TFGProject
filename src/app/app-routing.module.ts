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
import { EditarPerfilComponent } from './components/perfil/editar-perfil/editar-perfil.component';
import { HistorialPerfilComponent } from './components/perfil/historial-perfil/historial-perfil.component';
import { PantallaInicialComponent } from './components/pantalla-inicial/pantalla-inicial.component';
import { VerDonacionComponent } from './components/donacion/ver-donacion/ver-donacion.component';

const routes: Routes = [
  {path: '', redirectTo: 'Inicio', pathMatch: 'full' },
  {path: 'Inicio', component: PantallaInicialComponent},
  {path:'InicioSesion', component: LoginComponent},
  {path:'Registro', component: RegistroComponent},
  {path:'ListaBeneficiarios', component: ListarBeneficiariosComponent},
  {path:'ListaEmpresas', component: ListarEmpresasComponent},
  {path:'ListaDonaciones', component: ListarDonacionesComponent},
  {path:'ListaRecursos', component: ListarRecursosComponent},
  {path:'ListaNecesidades', component: ListarNecesitaComponent},
  {path:'Beneficiario', component: VerBeneficiarioComponent},
  {path:'Empresa', component: VerEmpresaComponent},
  {path:'Donacion', component: VerDonacionComponent},
  {path:'MiPerfil/:id', component: VerPerfilComponent},
  {path:'EditarPerfil/:id', component: EditarPerfilComponent},
  {path:'HistorialDonaciones/:id', component: HistorialPerfilComponent},
  { path: '**',  redirectTo: 'Inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
