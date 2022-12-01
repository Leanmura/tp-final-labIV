import { Component, OnInit, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Especialista } from 'src/app/clases/especialista';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-turnos-finalizados',
  templateUrl: './turnos-finalizados.component.html',
  styleUrls: ['./turnos-finalizados.component.scss']
})
export class TurnosFinalizadosComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public rango: String = 'd';
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  public barChartLabels: any[] = [];
  public barChartDatasets: any[] = [{
    data: [],
    backgroundColor: []
  },
  ];
  public barChartLegend = true;
  public barChartPlugins = [];

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

    this.rango = restarDias(new Date(Date.now()), 30).getDate() + '/' + (restarDias(new Date(Date.now()), 30).getMonth() + 1) + '-' + new Date(Date.now()).getDate() + '/' + (new Date(Date.now()).getMonth() + 1);

    let especialistas: Especialista[] = [];
    this.barChartLabels.push("Turnos");
    this.userService.traerEspecialistas(especialistas).then(() => {
      especialistas.forEach((especialista, i) => {


        this.barChartDatasets[i] = {
          data: [0],
          label: especialista.nombre + " " + especialista.apellido,
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)},${Math.floor(
            Math.random() * 255
          )}, 1)`,
        };
        this.turnosService.getTurnos().subscribe((turnos) => {
          turnos.forEach(turno => {
            let turnoTS: any = turno.horario;
            let ts = new Timestamp(turnoTS['seconds'], 0);
            turno.horario = ts.toDate();
            console.log(turno.horario + '<' + new Date(Date.now()));
            if (turno.especialista.uid == especialista.uid && turno.estado == 1 && turno.horario <= new Date(Date.now()) && turno.horario >= restarDias(new Date(Date.now()), 30)) {
              this.barChartDatasets[i].data[0]++;
            }
          })
          this.chart?.update();
        });
      });
    });



  }
}
