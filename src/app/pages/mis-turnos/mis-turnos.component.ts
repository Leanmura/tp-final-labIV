import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {
  perfil?: string;
  usuario?: any;

  constructor(private userService: UserService) {
    this.userService.getUserProfile().subscribe((data) => {
      console.log(data);
      this.usuario = data;
      this.perfil = this.usuario['perfil'];
    });
    // this.usuario = this.userService.currentUser;
  }

  ngOnInit(): void {
  }

}
