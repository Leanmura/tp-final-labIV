import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, MinValidator, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { Historial } from 'src/app/clases/historial';
import { Paciente } from 'src/app/clases/paciente';
import { Estado, Turno } from 'src/app/clases/turno';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { HistorialService } from 'src/app/services/historial.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-especialista-turnos',
  templateUrl: './especialista-turnos.component.html',
  styleUrls: ['./especialista-turnos.component.scss']
})
export class EspecialistaTurnosComponent implements OnInit {
  turnosEnCurso: Turno[] = [];
  turnosEnCursoFiltro: Turno[] = [];
  filtro: string = '';
  historial: boolean = false;
  formHistorial: FormGroup;
  turnoFinalizado: Turno | any;
  historialActual: Historial | any;
  constructor(private especialidadService: EspecialidadService,
    private userService: UserService,
    private turnoService: TurnoService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private historialService: HistorialService) {
    this.formHistorial = this.fb.group({
      'Altura': ['', [Validators.required, Validators.min(30), Validators.max(3000)]],
      'Peso': ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      'Temperatura': ['', [Validators.required, Validators.min(-20), Validators.max(50)]],
      'Presion': ['', [Validators.required]],
      'Clave': ['', [Validators.required]],
      'Valor': ['', [Validators.required]],
      'Diagnostico': ['', [Validators.required]],

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
      this.turnosEnCursoFiltro = this.turnosEnCurso;
    });
  }

  guardar() {
    let nuevoHistorial = this.historialActual;
    nuevoHistorial.paciente = this.turnoFinalizado.paciente;
    nuevoHistorial.altura = this.formHistorial.value.Altura;
    nuevoHistorial.peso = this.formHistorial.value.Peso;
    nuevoHistorial.temperatura = this.formHistorial.value.Temperatura;
    nuevoHistorial.presion = this.formHistorial.value.Presion;
    let datoDinamicio = {
      clave: this.formHistorial.value.Clave,
      valor: this.formHistorial.value.Valor
    }
    nuevoHistorial.datosDinamicos.push(datoDinamicio);
    this.historialService.createHistorial(nuevoHistorial).then(() => {
      Swal.fire({
        title: "Historial guardado",
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.historial = false;


      this.turnoFinalizado.resenia = this.formHistorial.value.Diagnostico;
      this.turnoFinalizado.estado = Estado.realizado;
      this.turnoService.cambiarAFinalizado(this.turnoFinalizado).then((value) => {
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

    }).catch((e) => {
      console.log(e);
      Swal.fire({
        title: "No se pudo guardar el historial.",
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    });


  }

  filtrar() {
    console.log(this.filtro);

    this.turnosEnCursoFiltro = this.turnosEnCurso.filter(turno => {
      return turno.especialidad.nombre.trim().toLowerCase().includes(this.filtro.trim().toLowerCase()) ||
        turno.paciente.nombre.trim().toLowerCase().includes(this.filtro.trim().toLowerCase()) ||
        turno.paciente.apellido.trim().toLowerCase().includes(this.filtro.trim().toLowerCase());

      console.log(turno.paciente.nombre.trim().toLowerCase() + " tiene " + this.filtro.trim().toLowerCase() + " " + turno.paciente.nombre.trim().toLowerCase().includes(this.filtro.trim().toLowerCase()))
    });
    // console.log(this.turnosEnCursoFiltro);

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
        turno.comentarioRechazado = value.value;
        turno.estado = Estado.rechazado;
        this.turnoService.cambiarARechazado(turno).then((value) => {
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
    this.turnoFinalizado = turno;
    this.historial = true;
    this.historialService.traerHistorialUID(this.turnoFinalizado.paciente.uid).then((data) => {
      this.historialActual = data;
      if (this.historialActual) {
        this.formHistorial.controls['Peso'].setValue(this.historialActual.peso);
        this.formHistorial.controls['Altura'].setValue(this.historialActual.altura);
        this.formHistorial.controls['Temperatura'].setValue(this.historialActual.temperatura);
        this.formHistorial.controls['Presion'].setValue(this.historialActual.presion);
      }
    });
  }
}
