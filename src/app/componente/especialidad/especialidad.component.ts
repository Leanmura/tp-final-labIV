import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss']
})
export class EspecialidadComponent implements OnInit {
  especialidades: Especialidad[] = [];
  @Output() seleccioneEspecialidad: EventEmitter<Especialidad> = new EventEmitter<Especialidad>();

  constructor(private readonly especialidadService: EspecialidadService) {
    this.especialidadService.getEspecialidades().subscribe(
      (dato) => {
        this.especialidades = dato;

      }
    )
  }

  ngOnInit(): void {
  }


  seleccionarEspecialidad(especialidad: Especialidad) {

    //console.log(especialidad);

    this.seleccioneEspecialidad.emit(especialidad);
  }
}
