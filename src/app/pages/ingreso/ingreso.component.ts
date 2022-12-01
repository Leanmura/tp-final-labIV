import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/clases/admin';
import { Especialista } from 'src/app/clases/especialista';
import { Ingreso } from 'src/app/clases/ingreso';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { LogsService } from 'src/app/services/logs.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {
  captcha: string;
  formLog: FormGroup;
  archivos: any = [];
  usuariosAccesoRapido: Usuario[] = [];
  public previsualizacion?: string;
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private logService: LogsService) {
    this.formLog = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],

    });
    let pacientes: Paciente[] = [];
    userService.traerPacientes(pacientes).then(() => {
      for (let i = 0; i < 3; i++) {
        this.usuariosAccesoRapido.push(pacientes[i]);
      }
    });
    let especialistas: Especialista[] = [];
    userService.traerEspecialistas(especialistas).then(() => {
      for (let i = 0; i < 2; i++) {
        this.usuariosAccesoRapido.push(especialistas[i]);
      }
    });
    let admins: Admin[] = [];
    userService.traerAdmins(admins).then(() => {
      this.usuariosAccesoRapido.push(admins[0]);
    });
    console.log(this.usuariosAccesoRapido);
    this.captcha = '';
  }

  ngOnInit(): void {
  }

  ingresar() {
    if (this.captcha) {
      this.userService.login(this.formLog.value)
        .then(response => {
          console.log(response);
          this.userService.currentUser = response.user; // una vez logeado guardo/actualizo el current user

          let usuario: Usuario = new Usuario();
          this.userService.traerUsuarioUID(response.user.uid).then((res) => {
            // console.log("entro suuario1");
            if (this.userService.currentUser.emailVerified) {
              // console.log("entro suuario2");
              usuario = res;
              if (usuario.perfil == "Especialista") {
                console.log("entro Especialista");
                let especialista: Especialista;
                this.userService.traerEspecialistaUID(response.user.uid).then((response: Especialista) => {
                  especialista = response;
                  if (especialista.activo) {
                    this.router.navigateByUrl('/home');
                  }
                  else {
                    this.userService.logout();
                    Swal.fire({
                      title: "El correo no esta verificado.",
                      icon: 'error',
                      confirmButtonText: 'Ok'
                    });
                  }
                });
              }
              else {
                if (usuario.perfil == "Admin")
                  this.router.navigateByUrl('/usuarios');
                else
                  this.router.navigateByUrl('/home');

              }
              this.logService.createLog(new Ingreso(usuario.uid, usuario.apellido + " " + usuario.nombre, new Date(Date.now())))
            }
            else {
              this.userService.logout();
              Swal.fire({
                title: "El correo no esta verificado.",
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }

          });

        })
        .catch(error => {
          let titulo: string = "Correo o contraseña invalida";
          console.log(error.code);
          switch (error.code) {
            case "auth/missing-email": titulo = "No se ingreso el correo";
              break;
            case "auth/invalid-email": titulo = "Correo Invalido";
              break;
            case "auth/admin-restricted-operation":
            case "auth/internal-error": titulo = "Los campos son obligatorios"
          }

          Swal.fire({
            title: titulo,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        });

    }
    else {
      Swal.fire({
        title: 'Verifique que no es un robot.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  }

  async capturarFile(event: any) {
    this.previsualizacion = await this.userService.capturarFile(event);
    console.log(this.previsualizacion);

  }

  autoCompletar(email: String, password: String) {
    this.formLog.setValue({
      email: email,
      password: password
    });

  }



  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    // console.log('resolved captch with response: ' + this.captcha);
  }
}
