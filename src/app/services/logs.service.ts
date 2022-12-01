import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDocs, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ingreso } from '../clases/ingreso';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private firestore: Firestore) { }


  async createLog(ingreso: Ingreso) {
    try {
      const userDocRef = doc(this.firestore, `logs/${ingreso.id}`);
      //console.log(userDocRef);
      const id = ingreso.id;
      const usuario = ingreso.usuario;
      const log = ingreso.log;
      //console.log(log);
      await setDoc(userDocRef, { id, usuario, log });
      return true;
    } catch (e) {
      console.log(e)
      return null;
    }
  }


  getLogs(): Observable<Ingreso[]> {
    let col: any;
    getDocs(col = collection(this.firestore, "logs"));
    return collectionData(col) as Observable<Ingreso[]>;
  }
}
