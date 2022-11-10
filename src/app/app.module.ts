import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { PacienteComponent } from './pages/registro/paciente/paciente.component';
import { EspecialistaComponent } from './pages/registro/especialista/especialista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { RecaptchaModule } from 'ng-recaptcha';
import { AdminComponent } from './componente/registro/admin/admin.component';
import { SelectedDirective } from './directivas/selected.directive';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { EspecialidadComponent } from './componente/especialidad/especialidad.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
import { MisHorariosComponent } from './pages/mis-horarios/mis-horarios.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BienvenidaComponent,
    RegistroComponent,
    IngresoComponent,
    PacienteComponent,
    EspecialistaComponent,
    UsuariosComponent,
    AdminComponent,
    SelectedDirective,
    MiPerfilComponent,
    EspecialidadComponent,
    MisTurnosComponent,
    SolicitarTurnoComponent,
    MisHorariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
