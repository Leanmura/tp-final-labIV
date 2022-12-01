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
import { PacienteTurnosComponent } from './pages/mis-turnos/paciente-turnos/paciente-turnos.component';
import { RouterModule } from '@angular/router';
import { EspecialistaTurnosComponent } from './pages/mis-turnos/especialista-turnos/especialista-turnos.component';
import { InformesComponent } from './pages/informes/informes.component';
import { NgChartsModule } from 'ng2-charts';
import { TurnosPorEspecialidadComponent } from './componente/informes/turnos-por-especialidad/turnos-por-especialidad.component';
import { TurnosPorDiaComponent } from './componente/informes/turnos-por-dia/turnos-por-dia.component';
import { TurnosSolicitadosComponent } from './componente/informes/turnos-solicitados/turnos-solicitados.component';
import { TurnosFinalizadosComponent } from './componente/informes/turnos-finalizados/turnos-finalizados.component';
import { LogsComponent } from './componente/informes/logs/logs.component';
import { AgrandarDirective } from './directivas/agrandar.directive';
import { ColorDirective } from './directivas/color.directive';
import { BorderDirective } from './directivas/border.directive';
import { SustPropioPipe } from './pipes/sust-propio.pipe';
import { EdadPipe } from './pipes/edad.pipe';
import { AlturaPipe } from './pipes/altura.pipe';
import { PesoPipe } from './pipes/peso.pipe';
import { TemperaturaPipe } from './pipes/temperatura.pipe';

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
    MisHorariosComponent,
    PacienteTurnosComponent,
    SolicitarTurnoComponent,
    EspecialistaTurnosComponent,
    InformesComponent,
    TurnosPorEspecialidadComponent,
    TurnosPorDiaComponent,
    TurnosSolicitadosComponent,
    TurnosFinalizadosComponent,
    LogsComponent,
    AgrandarDirective,
    ColorDirective,
    BorderDirective,
    SustPropioPipe,
    EdadPipe,
    AlturaPipe,
    PesoPipe,
    TemperaturaPipe
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
    RecaptchaModule,
    NgChartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
