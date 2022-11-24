import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, setDoc } from '@angular/fire/firestore';
import { Historial } from '../clases/historial';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private firestore: Firestore) { }

  async createHistorial(historial: Historial) {
    try {
      const userDocRef = doc(this.firestore, `historiales/${historial.paciente.uid}`);
      console.log(userDocRef);
      const paciente = historial.paciente;
      const temperatura = historial.temperatura;
      const peso = historial.peso;
      const presion = historial.presion;
      const altura = historial.altura;
      const datosDinamicos = historial.datosDinamicos;
      console.log(historial);
      await setDoc(userDocRef, { paciente, presion, peso, altura, temperatura, datosDinamicos });
      return true;
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  async traerHistorialUID(uid: string): Promise<Historial | null> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, "historiales"));
      let historial: Historial | null = null;
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        if (doc.data()['paciente'].uid == uid) {
          historial = new Historial(doc.data()['paciente'], doc.data()['altura'], doc.data()['peso'], doc.data()['temperatura'], doc.data()['presion'], doc.data()['datosDinamicos'])
          //console.log(historial);
        }
      });
      return historial;
    } catch (e) {
      console.log(e);
      return null;
    }

  }

}
