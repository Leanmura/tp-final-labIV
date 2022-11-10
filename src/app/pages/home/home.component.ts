import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tabla: string;
  currentUser: any;
  constructor(private auth: UserService, private router: Router) {
    this.tabla = "PERFIL";
  }

  ngOnInit(): void {
    this.auth.getUserProfile().subscribe((dato) => {
      console.log(dato)
      this.currentUser = dato;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/bienvenida");
  }
}
