import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/clases/especialidad';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.scss']
})
export class EspecialistaComponent implements OnInit {
  formReg: FormGroup;
  archivos: any = [];
  public previsualizacion?: string;

  especialidades: any;
  especialidadesSeleccionadas: Especialidad[] = [];
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder,
    private spinner: NgxSpinnerService, private especialidadService: EspecialidadService) {
    this.formReg = this.fb.group({
      'nombre': ['', [Validators.required, this.spacesValidator, this.numberValidator]],
      'apellido': ['', [Validators.required, this.spacesValidator, this.numberValidator]],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(80)]],
      'dni': ['', [Validators.required, Validators.pattern("[0-9]{1,8}")]],
      'especialidad': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
      'copyPassword': ['', [Validators.required]],
      'img': ['', Validators.required],

    })
  }

  //////// CUSTON VALIDATOR /////////
  private spacesValidator(control: AbstractControl): null | object {
    const nombre: string = <string>control.value;
    const spaces: boolean = nombre.includes(' ');
    return spaces ? { constainsSpaces: true } : null;
  }

  private numberValidator(control: AbstractControl): null | object {
    const numero: string = <string>control.value;
    let hasNumber: boolean = false;
    for (let i = 0; i < 10; i++) {
      if (numero.includes(i.toString())) {
        hasNumber = true;
      }
    }
    return hasNumber ? { hasNumbers: true } : null;
  }

  ngOnInit(): void {
    this.especialidadService.getEspecialidades().subscribe((data: Especialidad[]) => {
      console.log(data);
      this.especialidades = data;
    });
  }

  registrar() {
    console.log(this.formReg);
    this.spinner.show();

    try {
      // console.log(this.formReg.value.img);
      this.formReg.value.img = this.previsualizacion;
      // console.log(this.formReg.value.img);

      this.userService.register(this.formReg.value)
        .then(response => {
          this.spinner.hide();
          Swal.fire({
            title: "Verifique su email",
            text: "Aguarde hasta que se de de alta su cuenta.",
            icon: 'warning',
            confirmButtonText: 'Ok'
          });
          this.router.navigateByUrl('/ingreso');
          //console.log(this.userService.currentUser);
        })
        .catch(error => {
          let titulo: string = "Correo o contraseña invalida";
          console.log(error.code);
          switch (error.code) {
            case "auth/weak-password": titulo = "La contraseña es muy insegura, ingrese 6 caracteres como minimo.";
              break;
            case "auth/invalid-email": titulo = "Correo Invalido";
              break;
            case "auth/email-already-in-use": titulo = "El correo ya se encuentra registrado";
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

    } catch (error: any) {
      Swal.fire({
        title: "Correo o contraseña invalida",
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  async capturarFile(event: any) {
    this.previsualizacion = await this.userService.capturarFile(event);
    console.log(this.previsualizacion);

  }

  tomoEspecialidadSeleccionada($event: Especialidad) {
    if (!this.especialidadesSeleccionadas.includes($event)) {
      this.especialidadesSeleccionadas.push($event);
      this.formReg.controls['especialidad'].setValue(this.especialidadesSeleccionadas);

    }
  }
}
