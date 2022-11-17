import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Estado, Turno } from 'src/app/clases/turno';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';

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
  turnos: string[] = [];
  currentUser: any;
  turnosEnCurso: Turno[] = [];
  constructor(
    private especialidadService: EspecialidadService,
    private userService: UserService,
    private turnoService: TurnoService,
    private spinner: NgxSpinnerService,
    private router: Router) {
    userService.getEspecialistas().subscribe(dato => {
      this.especialistas = dato;
    });

    // especialidadService.getEspecialidades().subscribe((datp) => {
    //   this.especialidades = datp;
    // });

  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((dato) => {
      console.table(dato)
      this.currentUser = dato;
    });

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

  clickEspecialista(especialista: Especialista) {
    this.especialista = especialista;
    this.especialidades = especialista.especialidad;
    this.tabla = 'ESPECIALIDADES';
    //console.log(especialista);
  }

  clickEspecialidad(especialidad: string) {
    let index = this.especialista.especialidad.findIndex(esp => esp.nombre == especialidad);
    //console.table(this.especialista.especialidad[index]);
    this.especialidad = this.especialista.especialidad[index];
    this.tabla = 'HORARIOS';
    this.futurosHorarios();
  }


  futurosHorarios() {
    let fecha15 = this.sumarDias(new Date(new Date().toDateString()), 15);
    let turnoHorarios: string[] = [];
    let days: number[] = [];
    let turnos: string[] = [];
    this.especialista.horarios.forEach(hora => {
      let especialidadHora = hora.split(" - ")[0];
      turnoHorarios.push(hora.split(" - ")[2]);
      if (especialidadHora == this.especialidad.nombre) {
        console.log(hora.split(" - ")[1]);
        switch (hora.split(" - ")[1]) {
          case 'LUNES':
            days.push(1);
            break;
          case 'MARTES':
            days.push(2);
            break;
          case 'MIERCOLES':
            days.push(3);
            break;
          case 'JUEVES':
            days.push(4);
            break;
          case 'VIERNES':
            days.push(5);
            break;
          case 'SABADO':
            days.push(6);
            break;
          default:
        }
      }
    });
    console.log(new Date().toLocaleDateString());
    days.forEach((day, x) => {
      for (let i = 1; i < 16; i++) {
        let f = this.sumarDias(new Date(new Date().toDateString()), i)
        //console.log(f);

        if (f.getDay() == day) {
          let esta = false;
          if (this.turnosEnCurso.length == 0) {
            turnos.push(f.getDate().toString() + "-" + (f.getMonth() + 1).toString() + ' ' + turnoHorarios[x]); // 22-10 10:00
          }
          else {
            for (let i = 0; i < this.turnosEnCurso.length; i++) { // esto es para que no se muestren los turnos ya solicitados
              // console.log(this.turnosEnCurso[i].especialista.uid + ' == ' + this.especialista.uid);
              // console.log(this.turnosEnCurso[i].paciente.uid + ' == ' + this.currentUser['uid']);
              // console.log(this.turnosEnCurso[i].horario.getDate() + ' == ' + f.getDate());
              // console.log(this.turnosEnCurso[i].horario.getMonth() + ' == ' + f.getMonth());
              // console.log(this.turnosEnCurso[i].horario.getHours().toString() + ' == ' + turnoHorarios[x].split(':')[0]);
              // console.log(this.turnosEnCurso[i].horario.getMinutes().toString() + ' == ' + turnoHorarios[x].split(':')[1]);


              if ((this.turnosEnCurso[i].especialista.uid == this.especialista.uid &&
                this.turnosEnCurso[i].paciente.uid == this.currentUser['uid'] &&
                this.turnosEnCurso[i].horario.getDate() == f.getDate() &&
                this.turnosEnCurso[i].horario.getMonth() == f.getMonth() &&
                this.turnosEnCurso[i].horario.getHours() == Number.parseInt(turnoHorarios[x].split(':')[0]) &&
                this.turnosEnCurso[i].horario.getMinutes() == Number.parseInt(turnoHorarios[x].split(':')[1]) // && turno.estado != Estado.cancelado // habria que agregar esto
              )) {
                esta = true;
                break;
              }
              else {
                if (!(i + 1 < this.turnosEnCurso.length)) {
                  //console.log(f.getDate().toString() + "-" + (f.getMonth() + 1).toString() + ' ' + turnoHorarios[x]); // le sumo uno al mes, xq va de 0-11
                  turnos.push(f.getDate().toString() + "-" + (f.getMonth() + 1).toString() + ' ' + turnoHorarios[x]); // 22-10 10:00
                }
              }

            }

          }

        }
      }
    });
    console.log(fecha15.toLocaleDateString());
    console.log(turnos);
    this.turnos = turnos;
  }


  sumarDias(fecha: Date, dias: number) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  pedirTurno(turnoString: string) {
    console.log(turnoString);
    const anio = new Date().getFullYear();
    const dia = Number.parseInt(turnoString.split('-')[0]);
    const mes = Number.parseInt(turnoString.split('-')[1].split(' ')[0]) - 1; // le resto uno al mes xq va del 0-11
    const hora = Number.parseInt(turnoString.split('-')[1].split(' ')[1].split(':')[0]);
    const minutos = Number.parseInt(turnoString.split('-')[1].split(' ')[1].split(':')[1]);

    let fechaYhora = new Date(anio, mes, dia, hora, minutos, 0, 0);
    console.log(fechaYhora.toString());
    // let paciente = new Paciente(this.currentUser['uid'], this.currentUser['nombre'], this.currentUser['apellido'], this.currentUser['dni'], this.currentUser['edad'], this.currentUser['correo'],
    //   this.currentUser['img'], this.currentUser['clave'], this.currentUser['img2'], this.currentUser['obraSocial']);
    // console.table(paciente);

    let turno = new Turno(fechaYhora, Estado.espera, "", "", "", this.currentUser, this.especialista, this.especialidad);
    this.spinner.show();
    this.turnoService.createTurno(turno).then(() => {
      this.spinner.hide();
      Swal.fire({
        title: "Turno solicitado",
        icon: 'success',
        confirmButtonText: 'Ok'
      });

    });
  }

}
