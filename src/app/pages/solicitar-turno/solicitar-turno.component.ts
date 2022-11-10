import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
  especialidad: Especialidad = new Especialidad();
  especialidades: Especialidad[] = [];
  especialista: Especialista = new Especialista();
  especialistas: Especialista[] = [];
  tabla: string = 'ESPECIALISTAS';
  horarios: string[] = [];

  constructor(private especialidadService: EspecialidadService, private userService: UserService) {
    userService.getEspecialistas().subscribe(dato => {
      this.especialistas = dato;
    });

    // especialidadService.getEspecialidades().subscribe((datp) => {
    //   this.especialidades = datp;
    // });

  }

  ngOnInit(): void {
  }

  clickEspecialista(especialista: Especialista) {
    this.especialista = especialista;
    this.especialidades = especialista.especialidad;
    this.tabla = 'ESPECIALIDADES';
    console.log(especialista);
  }

  clickEspecialidad(especialidad: string) {
    this.especialidad.nombre = especialidad;
    this.tabla = 'HORARIOS';
    this.especialista.horarios.forEach(hora => {
      let especialidadHora = hora.split(" - ")[0];
      if (especialidadHora == especialidad) {
        this.horarios.push(hora);
      }
    });
    //this.horarios = this.especialista.horarios;
    console.log(this.horarios);
  }


}
