import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
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
  especialistas: Especialista[] = [];
  especialidades: Especialidad[] = [];
  turnosEnCurso: Turno[] = [];
  constructor(private especialidadService: EspecialidadService,
    private userService: UserService,
    private turnoService: TurnoService,
    private spinner: NgxSpinnerService) {

    userService.getEspecialistas().subscribe(dato => {
      this.especialistas = dato;
    });

    especialidadService.getEspecialidades().subscribe((dato) => {
      this.especialidades = dato;
    });
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
    });
  }

  clickEspecialista(especialista: Especialista) { }
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

}
