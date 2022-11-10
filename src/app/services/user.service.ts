import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from '@angular/fire/auth'; // importar el servicio Auth
import { DomSanitizer } from '@angular/platform-browser';
import { getDownloadURL, ref, Storage, StorageReference, uploadString } from '@angular/fire/storage';
import { collection, collectionData, doc, docData, Firestore, getDocs, query, QuerySnapshot, setDoc, where } from '@angular/fire/firestore';
import { Paciente } from '../clases/paciente';
import { Especialista } from '../clases/especialista';
import { Admin } from '../clases/admin';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { Especialidad } from '../clases/especialidad';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any;
  constructor(private auth: Auth,
    private firestore: Firestore,
    private sanitizer: DomSanitizer,
    private storage: Storage) {
    this.currentUser = auth.currentUser;
  }

  async register({ nombre, apellido, edad, dni, especialidad, email, password, copyPassword, img, img2 }: any) {
    let downloadUrl: any = '';
    let downloadUrl2: any = '';
    try {
      let user;
      if (password == copyPassword) {
        user = await createUserWithEmailAndPassword(this.auth, email, password).then(
          () => {
            //this.login({ email, password });
            this.currentUser = this.auth.currentUser;
            sendEmailVerification(this.currentUser);
            this.logout();
          }
        )
      }
      else {
        throw "Las constraseñas no coinciden";
      }
      downloadUrl = await this.subirfoto(this.currentUser.uid, img);
      img = downloadUrl;
      if (img2) {
        downloadUrl2 = await this.subirfoto(this.currentUser.uid + "img2", img2);
        img2 = downloadUrl2;
      }
      if (especialidad) {
        if (!this.createEspecialista(nombre, apellido, edad, dni, email, password, img, especialidad)) throw new ErrorEvent("No se pudo alamacenar el usuario");
      }
      else
        if (img2) {
          if (!this.createPaciente(nombre, apellido, edad, dni, email, password, img, img2)) throw new ErrorEvent("No se pudo alamacenar el usuario");
        }
        else
          if (!this.createAdmin(nombre, apellido, edad, dni, email, password, img)) throw new ErrorEvent("No se pudo alamacenar el usuario");

      return user;
    } catch (error) {
      return null;
    }
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  async createEspecialista(name: string, surname: string, year: number, dnii: number, email: string, password: string, image: string, esp: Especialidad[]) { // para guardar en la base de datos
    const user = this.currentUser;
    try {
      const userDocRef = doc(this.firestore, `users/${user?.uid}`); // creamos un documento con el uid del usuario en users/ de la Cloud FireStore
      const uid = user?.uid;
      const correo = email;
      const creacion = user?.metadata.creationTime;
      const clave = password;
      const nombre = name;
      const apellido = surname;
      const edad = year;
      const dni = dnii;
      const img = image;
      const especialidad = esp;
      const perfil = "Especialista";
      console.log(userDocRef);
      await setDoc(userDocRef, { uid, correo, clave, nombre, apellido, edad, dni, img, creacion, especialidad, perfil }).then(() => console.log("exito especialista"));
      return true;
    } catch (e) {
      console.log(e)
      return null;
    }
  }
  async createPaciente(name: string, surname: string, year: number, dnii: number, email: string, password: string, image: string, image2: string = "", obraSocia: string = "") { // para guardar en la base de datos
    const user = this.currentUser;
    try {
      const userDocRef = doc(this.firestore, `users/${user?.uid}`); // creamos un documento con el uid del usuario en users/ de la Cloud FireStore
      const uid = user?.uid;
      const correo = email;
      const creacion = user?.metadata.creationTime;
      const clave = password;
      const nombre = name;
      const apellido = surname;
      const edad = year;
      const dni = dnii;
      const img = image;
      const img2 = image2;
      const perfil = "Paciente";
      const obraSocial = obraSocia;

      console.log(userDocRef);
      await setDoc(userDocRef, { uid, correo, clave, nombre, apellido, edad, dni, img, creacion, img2, perfil, obraSocial }).then(() => console.log("exito paciente"));
      return true;
    } catch (e) {
      console.log(e)
      return null;
    }
  }

  async createAdmin(name: string, surname: string, year: number, dnii: number, email: string, password: string, image: string) { // para guardar en la base de datos
    const user = this.currentUser;
    try {
      const userDocRef = doc(this.firestore, `users/${user?.uid}`); // creamos un documento con el uid del usuario en users/ de la Cloud FireStore
      const uid = user?.uid;
      const correo = email;
      const creacion = user?.metadata.creationTime;
      const clave = password;
      const nombre = name;
      const apellido = surname;
      const edad = year;
      const dni = dnii;
      const img = image;
      const perfil = "Admin";

      console.log(userDocRef);
      await setDoc(userDocRef, { uid, correo, clave, nombre, apellido, edad, dni, img, creacion, perfil }).then(() => console.log("exito Admin"));
      return true;
    } catch (e) {
      console.log(e)
      return null;
    }
  }
  getUserProfile() {
    const user = this.auth.currentUser; // devuelve el usuario actual
    const userDocRef = doc(this.firestore, `users/${user?.uid}`);
    return docData(userDocRef);
  }

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0]
    return this.extraerBase64(archivoCapturado).then((imagen: any) => {
      return imagen.base;
    })
    //this.archivos.push(archivoCapturado)
    // 

  }

  async subirfoto(uid: string, img: any) {
    const path = `fotos/` + uid + `.png`; // path donde vamos aguardar la imagen
    const storageRef = ref(this.storage, path); // creamos esa directiva en el storage y obtenemos la referencia al mismo
    let uploadImageRef: any; // StorageReference;
    try {
      await uploadString(storageRef, img.slice(23), 'base64').
        then(response => uploadImageRef = response.ref).
        catch(e => console.log(e));
      return await getDownloadURL(uploadImageRef);
    } catch (e) {
      console.log(e);
      return null;
    }
  }


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return true;

    } catch (e) {
      return null;
    }
  })

  async traerPacientes(pacientes: Paciente[]) {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, "users"));

      querySnapshot.forEach((doc) => {
        //console.log(doc.id, "=>", doc.data());
        if (doc.data()['perfil'] == "Paciente") {
          let user = new Paciente(doc.data()['uid'], doc.data()['nombre'], doc.data()['apellido'], doc.data()['dni'], doc.data()['edad'], doc.data()['correo'], doc.data()['img'], doc.data()['clave'], doc.data()['img2'], doc.data()['obraSocial']);
          pacientes.push(user);
        }
      });

      return true;
    } catch (e) {
      return e;
    }

  }

  async traerEspecialistas(especialistas: Especialista[]) {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, "users"));

      querySnapshot.forEach((doc) => {
        //console.log(doc.id, "=>", doc.data());
        if (doc.data()['perfil'] == "Especialista") {
          let especialista = new Especialista(doc.data()['uid'], doc.data()['nombre'], doc.data()['apellido'], doc.data()['dni'], doc.data()['edad'], doc.data()['correo'], doc.data()['img'], doc.data()['clave'], doc.data()['especialidad'], doc.data()['activo']);
          especialistas.push(especialista);
        }
      });

      return true;
    } catch (e) {
      return e;
    }
  }

  async traerUsuarioUID(uid: string): Promise<Usuario> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, "users"));

      let usuario = new Usuario();
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, "=>", doc.data());
        if (doc.data()['uid'] == uid) {
          usuario = new Usuario(doc.data()['uid'], doc.data()['nombre'], doc.data()['apellido'], doc.data()['dni'], doc.data()['edad'], doc.data()['correo'], doc.data()['img'], doc.data()['clave'], doc.data()['perfil']);
          // usuario.uid = doc.data()['uid'];
          // usuario.nombre = doc.data()['nombre'];
          // usuario.apellido = doc.data()['apellido'];
          // usuario.dni = doc.data()['dni'];
          // usuario.edad = doc.data()['edad'];
          // usuario.correo = doc.data()['correo'];
          // usuario.img = doc.data()['img'];
          // usuario.clave = doc.data()['clave'];
          // usuario.perfil = doc.data()['perfil'];
          console.log(usuario);
        }
      });
      return usuario;
    } catch (e) {
      console.log(e);
      return new Usuario();
    }

  }

  async traerEspecialistaUID(uid: string): Promise<Especialista> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, "users"));
      let especialista: Especialista = new Especialista();
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, "=>", doc.data());
        if (doc.data()['uid'] == uid) {
          especialista = new Especialista(doc.data()['uid'], doc.data()['nombre'], doc.data()['apellido'], doc.data()['dni'], doc.data()['edad'], doc.data()['correo'], doc.data()['img'], doc.data()['perfil'], doc.data()['especialidad'], doc.data()['activo'])
          // especialista.uid = doc.data()['uid'];
          // especialista.nombre = doc.data()['nombre'];
          // especialista.apellido = doc.data()['apellido'];
          // especialista.dni = doc.data()['dni'];
          // especialista.edad = doc.data()['edad'];
          // especialista.correo = doc.data()['correo'];
          // especialista.img = doc.data()['img'];
          // especialista.clave = doc.data()['clave'];
          // especialista.perfil = doc.data()['perfil'];
          // especialista.especialidad = doc.data()['especialidad'];
          // especialista.activo = doc.data()['activo'];
          console.log(especialista);
        }
      });
      return especialista;
    } catch (e) {
      console.log(e);
      return new Especialista();
    }

  }

  getUsuarios(): Observable<Usuario[]> {
    let col: any;
    getDocs(col = collection(this.firestore, "users"));
    return collectionData(col) as Observable<Usuario[]>;
  }

  getEspecialistas(): Observable<Especialista[]> {
    const q = query(collection(this.firestore, "users"), where("perfil", "==", "Especialista"));
    getDocs(q);
    return collectionData(q) as Observable<Especialista[]>;
  }

  async traerAdmins(admins: any[]) {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, "users"));

      querySnapshot.forEach((doc) => {
        //console.log(doc.id, "=>", doc.data());
        if (doc.data()['perfil'] == "Admin") {
          let admin = new Admin(doc.data()['uid'], doc.data()['nombre'], doc.data()['apellido'], doc.data()['dni'], doc.data()['edad'], doc.data()['correo'], doc.data()['img'], doc.data()['clave']);
          admins.push(admin);
        }
      });

      return true;
    } catch (e) {
      return e;
    }

  }
}

