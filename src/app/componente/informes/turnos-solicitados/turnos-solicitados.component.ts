import { Component, OnInit, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Especialista } from 'src/app/clases/especialista';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-turnos-solicitados',
  templateUrl: './turnos-solicitados.component.html',
  styleUrls: ['./turnos-solicitados.component.scss']
})
export class TurnosSolicitadosComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public rango: String = 'd';
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
  };
  public doughnutChartLabels: any[] = [];
  public doughnutChartDatasets: any[] = [{
    data: [],
    backgroundColor: []
  },
  ];
  public doughnutChartLegend = true;
  public doughnutChartPlugins = [];

  turnos: Turno[] = [];

  constructor(private turnosService: TurnoService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.turnosFinalizados();
  }

  turnosFinalizados() {

    const restarDias = (fecha: Date, dias: number): Date => {
      fecha.setDate(fecha.getDate() - dias);
      return fecha;
    }

    const sumarDias = (fecha: Date, dias: number): Date => {
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    }

    this.rango = new Date(Date.now()).getDate() + '/' + (new Date(Date.now()).getMonth() + 1) + '-' + sumarDias(new Date(Date.now()), 30).getDate() + '/' + (sumarDias(new Date(Date.now()), 30).getMonth() + 1);

    let especialistas: Especialista[] = [];
    this.userService.traerEspecialistas(especialistas).then(() => {
      especialistas.forEach((especialista, i) => {


        this.doughnutChartLabels.push(especialista.nombre + " " + especialista.apellido);
        this.doughnutChartDatasets[0].data.push(0);
        this.doughnutChartDatasets[0].backgroundColor.push(`rgba(${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)},${Math.floor(
          Math.random() * 255
        )}, 1)`);

        this.turnosService.getTurnos().subscribe((turnos) => {
          turnos.forEach(turno => {
            let turnoTS: any = turno.horario;
            let ts = new Timestamp(turnoTS['seconds'], 0);
            turno.horario = ts.toDate();
            console.log(turno.horario + '<' + new Date(Date.now()));
            if (turno.especialista.uid == especialista.uid && turno.estado == 4 && turno.horario >= new Date(Date.now()) && turno.horario <= sumarDias(new Date(Date.now()), 30)) {
              this.doughnutChartDatasets[0].data[i]++;
            }
          })
          this.chart?.update();
        });
      });
    });



  }
}
