import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos-por-especialidad',
  templateUrl: './turnos-por-especialidad.component.html',
  styleUrls: ['./turnos-por-especialidad.component.scss']
})
export class TurnosPorEspecialidadComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  };
  public pieChartLabels: any[] = [];
  public pieChartDatasets: any[] = [{
    data: [],
    backgroundColor: []
  },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private turnosService: TurnoService, private especialidadService: EspecialidadService) {
  }

  ngOnInit(): void {
    this.turnosPorEspecialidad();

  }

  turnosPorEspecialidad() {
    this.especialidadService.getEspecialidades().subscribe(esecialidades => {
      this.pieChartDatasets = [{
        data: [],
        backgroundColor: []
      }];
      this.pieChartLabels = [];

      console.table(esecialidades);
      esecialidades.forEach((especialidad, i) => {

        this.pieChartLabels.push(especialidad.nombre);
        this.pieChartDatasets[0].data.push(0);
        this.pieChartDatasets[0].backgroundColor.push(`rgba(${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)},${Math.floor(
          Math.random() * 255
        )}, 1)`);
      });
      this.turnosService.getTurnos().subscribe((turnos) => {
        console.table(turnos);
        turnos.forEach(turno => {
          this.pieChartLabels.forEach((especialidad, i) => {
            if (turno.especialidad.nombre == especialidad) {
              this.pieChartDatasets[0].data[i]++;
            }
          });
        });
        this.chart?.update();
      });
    });

  }

}
