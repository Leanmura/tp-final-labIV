import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {

  constructor(private router: Router,
    private spinner: NgxSpinnerService) {
    // this.spinner.show();
    // setTimeout(() => { this.spinner.hide() }, 5000);
  }

  ngOnInit(): void {
  }

  abrirRegistro() {
    this.router.navigateByUrl("/registro");
  }

  abrirIngreso() {
    this.router.navigateByUrl("/ingreso");
  }
}
