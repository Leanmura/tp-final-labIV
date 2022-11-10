import { Component, OnInit } from '@angular/core';
import { Spinner } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Admin } from 'src/app/clases/admin';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Especialidad } from 'src/app/clases/especialidad';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  usuarioActual: any;
  admin?: Admin;
  especialista?: Especialista;
  paciente?: Paciente;
  constructor(private auth: UserService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.auth.getUserProfile().subscribe((res) => {
      this.spinner.hide();
      this.usuarioActual = res;
      switch (this.perfil) {
        case "Admin":
          this.admin = new Admin(this.uid, this.nombre, this.apellido, this.dni, this.edad, this.correo, this.foto, this.clave);
          break;
        case "Especialista":
          this.especialista = new Especialista(this.uid, this.nombre, this.apellido, this.dni, this.edad, this.correo, this.foto, this.clave, this.especialidad, this.activo);
          break;
        case "Paciente":
          this.paciente = new Paciente(this.uid, this.nombre, this.apellido, this.dni, this.edad, this.correo, this.foto, this.clave, this.img2, this.obraSocial);
          break;
      }
    });


  }

  ngOnInit(): void {

  }
  public get uid(): string {
    return this.usuarioActual['uid'];
  }
  public get clave(): string {
    return this.usuarioActual['clave'];
  }
  public get foto(): string {
    return this.usuarioActual['img'];
  }
  public get nombre(): string {
    return this.usuarioActual['nombre'];
  }
  public get apellido(): string {
    return this.usuarioActual['apellido'];
  }
  public get dni(): number {
    return this.usuarioActual['dni'];
  }
  public get correo(): string {
    return this.usuarioActual['correo'];
  }
  public get edad(): number {
    return this.usuarioActual['edad'];
  }

  public get perfil(): string {
    return this.usuarioActual['perfil'];
  }

  public get img2(): string {
    return this.usuarioActual['img2'];
  }
  public get especialidad(): Especialidad[] {
    return this.usuarioActual['especialidad'];
  }
  public get activo(): boolean {
    return this.usuarioActual['activo'];
  }
  public get obraSocial(): string {
    return this.usuarioActual['obraSocial'];
  }

}
