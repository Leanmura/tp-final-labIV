import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Turno } from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {


  constructor(private firestore: Firestore) { }

  getTurnos(): Observable<Turno[]> {
    let col: any;
    getDocs(col = collection(this.firestore, "turnos"));
    return collectionData(col) as Observable<Turno[]>;
  }

  async createTurno(turno: Turno) {
    try {
      const userDocRef = doc(this.firestore, `turnos/${turno.id}`);
      console.log(userDocRef);
      const id = turno.id;
      const horario = turno.horario;
      const estado = turno.estado;
      const comentarioAtencion = turno.comentarioAtencion;
      const resenia = turno.resenia;
      const paciente = turno.paciente;
      const especialista = turno.especialista;
      const comentarioCancelado = turno.comentarioCancelado;
      const especialidad = turno.especialidad;
      console.log(turno);
      await setDoc(userDocRef, { id, horario, estado, comentarioCancelado, resenia, comentarioAtencion, paciente, especialista, especialidad });
      return true;
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  async cambiarACancelado(turno: Turno) {
    try {
      const postDocRef = doc(this.firestore, `turnos/${turno.id}`);
      const comentarioCancelado = turno.comentarioCancelado;
      const estado = turno.estado;
      await updateDoc(postDocRef, { comentarioCancelado, estado });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async cambiarARechazado(turno: Turno) {
    try {
      const postDocRef = doc(this.firestore, `turnos/${turno.id}`);
      const comentarioRechazado = turno.comentarioRechazado;
      const estado = turno.estado;
      await updateDoc(postDocRef, { comentarioRechazado, estado });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async cambiarAFinalizado(turno: Turno) {
    try {
      const postDocRef = doc(this.firestore, `turnos/${turno.id}`);
      const resenia = turno.resenia;
      const estado = turno.estado;
      await updateDoc(postDocRef, { resenia, estado });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async cambiarAAceptado(turno: Turno) {
    try {
      const postDocRef = doc(this.firestore, `turnos/${turno.id}`);
      const estado = turno.estado;
      await updateDoc(postDocRef, { estado });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async cambiarComentarioAtencion(turno: Turno) {
    try {
      const postDocRef = doc(this.firestore, `turnos/${turno.id}`);
      const comentarioAtencion = turno.comentarioAtencion;
      await updateDoc(postDocRef, { comentarioAtencion });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}
