import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { arrayUnion, collection, doc, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { getFirestore } from '@firebase/firestore';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.scss']
})
export class MisHorariosComponent implements OnInit {
  horarios: any[][] = [
    ["HORA", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"],
    ["8:00", false, false, false, false, false, false],
    ["8:30", false, false, false, false, false, false],
    ["9:00", false, false, false, false, false, false],
    ["9:30", false, false, false, false, false, false],
    ["10:00", false, false, false, false, false, false],
    ["10:30", false, false, false, false, false, false],
    ["11:00", false, false, false, false, false, false],
    ["11:30", false, false, false, false, false, false],
    ["12:00", false, false, false, false, false, false],
    ["12:30", false, false, false, false, false, false],
    ["13:00", false, false, false, false, false, false],
    ["13:30", false, false, false, false, false, false],
    ["14:00", false, false, false, false, false, false],
    ["14:30", false, false, false, false, false, false],
    ["15:00", false, false, false, false, false, false],
    ["15:30", false, false, false, false, false, false],
    ["16:00", false, false, false, false, false, false],
    ["16:30", false, false, false, false, false, false],
    ["17:00", false, false, false, false, false, false],
    ["17:30", false, false, false, false, false, false],
    ["18:00", false, false, false, false, false, false],
    ["18:30", false, false, false, false, false, false],
    ["19:00", false, false, false, false, false, false],
    ["19:30", false, false, false, false, false, false]

  ];

  especialidadActual: string = "Ginecologo";

  constructor(private firestore: Firestore, private auth: Auth, private espService: EspecialidadService, private userSercivce: UserService) { }
  ngOnInit(): void {
    //console.table(this.horarios);
    this.traerHorarios();
    this.userSercivce.getUserProfile().subscribe(usuario => {
      console.log(usuario['especialidad']);
      this.especialidadActual = usuario['especialidad'][0].nombre;
    });
  }

  async cambiarEstado(i: number, x: number) {

    this.horarios[i][x] = !this.horarios[i][x];
  }

  async traerHorarios() {
    let horariosDisponibles: string[] = [];

    try {
      const querySnapshot = await getDocs(collection(this.firestore, "users"));

      querySnapshot.forEach((doc) => { // recorre todos los docs/users
        //console.log(doc.id, "=>", doc.data());
        if (doc.id == this.auth.currentUser?.uid && doc.data()['horarios'])
          horariosDisponibles = (doc.data()['horarios']);
      });
      console.table(horariosDisponibles);
    }
    catch (e) {
      return e;
    }

    if (horariosDisponibles.length > 0) {
      horariosDisponibles.forEach((horario) => {
        let array = horario.split(" - ");
        for (let i = 0; i < 25; i++) {
          for (let x = 0; x < 7; x++) {
            if (array[2] == this.horarios[i][0] && array[1] == this.horarios[0][x])
              this.horarios[i][x] = true;
          }
        }
      })
    }

  }

  async guardarHorariosDisponibles() {
    let horariosDisponibles: string[] = [];
    for (let i = 0; i < 25; i++) {
      for (let x = 0; x < 7; x++) {
        if (this.horarios[i][x] == true) {
          horariosDisponibles.push(this.especialidadActual + " - " + this.horarios[0][x] + " - " + this.horarios[i][0])
        }
      }
    }
    //console.table(horariosDisponibles);

    try {
      const docRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}`);
      await updateDoc(docRef, { "horarios": horariosDisponibles });
      Swal.fire({
        title: "Horarios guardados con exito.",
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      return true;
    } catch (e) {
      Swal.fire({
        title: "Hubo un error.",
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      console.log(e);
      return e;
    }
  }


}
