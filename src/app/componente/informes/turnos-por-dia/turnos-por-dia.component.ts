import { Component, OnInit, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Turno } from 'src/app/clases/turno';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos-por-dia',
  templateUrl: './turnos-por-dia.component.html',
  styleUrls: ['./turnos-por-dia.component.scss']
})
export class TurnosPorDiaComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

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

  constructor(private turnosService: TurnoService) {
  }

  ngOnInit(): void {
    this.turnosPorDia();
  }

  turnosPorDia() {
    let contador = 0;
    this.turnosService.getTurnos().subscribe((turnos) => {
      this.barChartLabels = [];
      this.barChartDatasets = [{
        data: [],
        backgroundColor: []
      }];
      //console.table(turnos);
      turnos.forEach((turno, i) => {

        let turnoTS: any = turno.horario;
        let ts = new Timestamp(turnoTS['seconds'], 0);
        turno.horario = ts.toDate();
        let index = -1;
        this.barChartDatasets.forEach((data, i2) => {
          if (data['label'] == (turno.horario.getDate() + "/" + (turno.horario.getMonth() + 1))) {
            index = i2;
          }
        });
        //console.log(index);
        if (index == -1) {

          this.barChartDatasets[contador] = {
            data: [1],
            label: turno.horario.getDate() + "/" + (turno.horario.getMonth() + 1),
            backgroundColor: `rgba(${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)},${Math.floor(
              Math.random() * 255
            )}, 1)`,
          };
          // this.barChartLabels.push(turno.horario.getDate() + "/" + turno.horario.getMonth());
          //this.barChartDatasets[0].label = turno.horario.getDate() + "/" + turno.horario.getMonth();
          // this.barChartDatasets[i].data.push(1);
          // this.barChartDatasets[i].backgroundColor.push(`rgba(${Math.floor(
          //   Math.random() * 255
          // )}, ${Math.floor(Math.random() * 255)},${Math.floor(
          //   Math.random() * 255
          // )}, 1)`);
          contador++;
        }
        else {
          this.barChartDatasets[index].data[0]++;
        }
        // console.log(turno.horario.getDate() + "/" + (turno.horario.getMonth()+1));
        // console.log(this.barChartDatasets[0].data[index]);

      });
      this.turnos = turnos;
      // console.log(this.turnos);
      this.barChartLabels.push("Turnos");

      this.chart?.update();
    });

  }
}
