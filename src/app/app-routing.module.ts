import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { HomeComponent } from './pages/home/home.component';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo, } from '@angular/fire/auth-guard';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin.guard';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';

const routes: Routes = [
  {
    path: "bienvenida", component: BienvenidaComponent,
    ...canActivate(() => redirectLoggedInTo(['/home']))
  },
  {
    path: "registro", component: RegistroComponent,
    ...canActivate(() => redirectLoggedInTo(['/home']))
  },
  {
    path: "ingreso", component: IngresoComponent,
    ...canActivate(() => redirectLoggedInTo(['/home']))
  },
  {
    path: "home", component: HomeComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/bienvenida']))
  },
  {
    path: "usuarios", component: UsuariosComponent,

  },
  {
    path: "mi-perfil", component: MiPerfilComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/bienvenida']))
  },
  {
    path: "", component: BienvenidaComponent,
    ...canActivate(() => redirectLoggedInTo(['/home']))
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
