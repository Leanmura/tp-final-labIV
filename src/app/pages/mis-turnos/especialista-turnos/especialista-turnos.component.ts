import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Estado, Turno } from 'src/app/clases/turno';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-especialista-turnos',
  templateUrl: './especialista-turnos.component.html',
  styleUrls: ['./especialista-turnos.component.scss']
})
export class EspecialistaTurnosComponent implements OnInit {
  especialidades: Especialidad[] = [];
  turnosEnCurso: Turno[] = [];
  pacientes: Paciente[] = [];

  constructor(private especialidadService: EspecialidadService,
    private userService: UserService,
    private turnoService: TurnoService,
    private spinner: NgxSpinnerService) {
    this.userService.getUserProfile().subscribe((dato) => {
      this.especialidades = dato['especialidad'];
      //console.log(this.especialidades);
    })

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
      this.turnosEnCurso.forEach(turno => {
        if (!this.pacientes.find(p => p.uid == turno.paciente.uid)) {
          this.pacientes.push(turno.paciente);
        }
      })
    });
  }

  clickEspecialista(especialista: Paciente) { }
  clickEspecialidad() { }

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

  rechazar(turno: Turno) {
    Swal.fire({
      title: "Motivo del rechazo: ",
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
              title: "Turno rechazado",
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          }
          else {
            Swal.fire({
              title: "No se pudo rechazar el turno",
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    });
  }

  aceptar(turno: Turno) {
    turno.estado = Estado.aceptado;
    this.turnoService.cambiarAAceptado(turno).then((value) => {
      if (value) {
        Swal.fire({
          title: "Turno aceptado",
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      }
      else {
        Swal.fire({
          title: "No se pudo aceptar el turno",
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

  finalizar(turno: Turno) {
    Swal.fire({
      title: "Diagnostico: ",
      input: 'text',
      icon: 'question',
      confirmButtonText: 'Ok',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then(value => {
      if (value.value) {
        turno.resenia = value.value;
        turno.estado = Estado.realizado;
        this.turnoService.cambiarAFinalizado(turno).then((value) => {
          if (value) {
            Swal.fire({
              title: "Turno Finalizado",
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          }
          else {
            Swal.fire({
              title: "No se pudo finalizar el turno",
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    });
  }
}
