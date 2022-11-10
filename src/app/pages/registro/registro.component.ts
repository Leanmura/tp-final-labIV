import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  usuario?: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  registroPaciente() {
    this.usuario = 'paciente';

  }
  registroEspecialista() {
    this.usuario = 'especialista';
  }
}
