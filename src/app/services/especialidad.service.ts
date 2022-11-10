import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDocs, addDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Especialidad } from '../clases/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private firestore: Firestore) { }

  getEspecialidades(): Observable<Especialidad[]> {
    let col: any;
    getDocs(col = collection(this.firestore, "especialidades"));
    return collectionData(col) as Observable<Especialidad[]>;
  }

  async createEspecialidad(especialidad: Especialidad) {
    try {
      const userDocRef = doc(this.firestore, `especialidades/${especialidad.nombre}`);
      console.log(userDocRef);
      const id = especialidad.id;
      const nombre = especialidad.nombre;
      const foto = especialidad.foto;
      console.log(especialidad);
      await setDoc(userDocRef, { id, nombre, foto });
      return true;
    } catch (e) {
      console.log(e)
      return null;
    }
  }
}
