import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { stringLength } from '@firebase/util';
import { NgxSpinnerService } from 'ngx-spinner';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { Estado, Turno } from 'src/app/clases/turno';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-turnos',
  templateUrl: './paciente-turnos.component.html',
  styleUrls: ['./paciente-turnos.component.scss']
})
export class PacienteTurnosComponent implements OnInit {
  turnosEnCurso: Turno[] = [];
  turnosEnCursoFiltro: Turno[] = [];
  filtro: string = '';
  constructor(private especialidadService: EspecialidadService,
    private userService: UserService,
    private turnoService: TurnoService,
    private spinner: NgxSpinnerService) {


  }

  ngOnInit(): void {
    this.turnoService.getTurnos().subscribe((dato) => {
      //console.table(dato);
      dato.forEach(turno => {
        let turnoTS: any = turno.horario;
        let ts = new Timestamp(turnoTS['seconds'], 0);
        turno.horario = ts.toDate();
      })
      this.turnosEnCurso = dato;
      this.turnosEnCursoFiltro = this.turnosEnCurso;
    });
  }

  filtrar() {
    console.log(this.filtro);

    this.turnosEnCursoFiltro = this.turnosEnCurso.filter(turno => {
      return turno.especialidad.nombre.trim().toLowerCase().includes(this.filtro.trim().toLowerCase()) ||
        turno.especialista.nombre.trim().toLowerCase().includes(this.filtro.trim().toLowerCase()) ||
        turno.especialista.apellido.trim().toLowerCase().includes(this.filtro.trim().toLowerCase());

      console.log(turno.especialidad.nombre.trim().toLowerCase() + " tiene " + this.filtro.trim().toLowerCase() + " " + turno.especialidad.nombre.trim().toLowerCase().includes(this.filtro.trim().toLowerCase()))
    });
    console.log(this.turnosEnCursoFiltro);

    if (this.filtro == '') {
      this.turnosEnCursoFiltro = this.turnosEnCurso;
      console.log(this.turnosEnCursoFiltro);

    }

  }

  cancelar(turno: Turno) {
    Swal.fire({
      title: "Motivo de la cancelacion: ",
      input: 'text',
      icon: 'question',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then(value => {
      if (value.value) {
        turno.comentarioCancelado = value.value;
        turno.estado = Estado.cancelado;
        this.turnoService.cambiarACancelado(turno).then((value) => {
          if (value) {
            Swal.fire({
              title: "Turno Cancelado",
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          }
          else {
            Swal.fire({
              title: "No se pudo cancelar el turno",
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    });
  }

  verResenia(turno: Turno) {
    Swal.fire({
      title: "Reseña",
      text: turno.resenia,
      icon: 'info',
      confirmButtonText: 'Ok',
    });
  }

  calificar(turno: Turno) {
    Swal.fire({
      title: "Calificacion: ",
      input: 'text',
      icon: 'question',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then(value => {
      if (value.value) {
        turno.comentarioAtencion = value.value;
        this.turnoService.cambiarComentarioAtencion(turno).then((value) => {
          if (value) {
            Swal.fire({
              title: "Calificado",
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          }
          else {
            Swal.fire({
              title: "No se pudo calificar",
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    });
  }

  encuesta(turno: Turno) {

  }
}
