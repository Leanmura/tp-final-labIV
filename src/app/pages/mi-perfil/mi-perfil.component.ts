import { Component, OnInit } from '@angular/core';
import { Spinner } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Admin } from 'src/app/clases/admin';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Especialidad } from 'src/app/clases/especialidad';
import { Historial } from 'src/app/clases/historial';
import { HistorialService } from 'src/app/services/historial.service';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  usuarioActual: any;
  admin?: Admin;
  especialista?: Especialista;
  paciente?: Paciente;
  historial?: Historial | null;

  constructor(private auth: UserService, private spinner: NgxSpinnerService, private historialService: HistorialService) {
    this.spinner.show();
    this.auth.getUserProfile().subscribe((res) => {
      this.spinner.hide();
      this.usuarioActual = res;
      switch (this.perfil) {
        case "Admin":
          this.admin = new Admin(this.uid, this.nombre, this.apellido, this.dni, this.edad, this.correo, this.foto, this.clave);
          break;
        case "Especialista":
          this.especialista = new Especialista(this.uid, this.nombre, this.apellido, this.dni, this.edad, this.correo, this.foto, this.clave, this.especialidad, this.activo);
          break;
        case "Paciente":
          this.paciente = new Paciente(this.uid, this.nombre, this.apellido, this.dni, this.edad, this.correo, this.foto, this.clave, this.img2, this.obraSocial);
          this.traerHistorial();

          break;
      }
    });


  }

  ngOnInit(): void {

  }
  public get uid(): string {
    return this.usuarioActual['uid'];
  }
  public get clave(): string {
    return this.usuarioActual['clave'];
  }
  public get foto(): string {
    return this.usuarioActual['img'];
  }
  public get nombre(): string {
    return this.usuarioActual['nombre'];
  }
  public get apellido(): string {
    return this.usuarioActual['apellido'];
  }
  public get dni(): number {
    return this.usuarioActual['dni'];
  }
  public get correo(): string {
    return this.usuarioActual['correo'];
  }
  public get edad(): number {
    return this.usuarioActual['edad'];
  }

  public get perfil(): string {
    return this.usuarioActual['perfil'];
  }

  public get img2(): string {
    return this.usuarioActual['img2'];
  }
  public get especialidad(): Especialidad[] {
    return this.usuarioActual['especialidad'];
  }
  public get activo(): boolean {
    return this.usuarioActual['activo'];
  }
  public get obraSocial(): string {
    return this.usuarioActual['obraSocial'];
  }


  traerHistorial() {
    this.historialService.traerHistorialUID(this.uid).then(data => {
      this.historial = data;
      console.log(data);
    });
  }



  // async descargarMiHistoria() {
  //   //data:image/png;base64,
  //   let img: string = '';
  //   // function to encode file data to base64 encoded string
  //   const historial = this.historial!;
  //   const usuario = this.auth.currentUser!;
  //   var request = new XMLHttpRequest();
  //   request.open('GET', '../../../assets/LOGO.png', true);
  //   request.responseType = 'blob';
  //   request.onload = function () {
  //     var reader = new FileReader();
  //     console.log(typeof request.response);
  //     reader.readAsDataURL(request.response as Blob);
  //     reader.onload = function (e) {
  //       console.log('DataURL:', e.target!.result);
  //       img = e.target!.result as string;
  //       let agregados: { text: string }[] = [];
  //       historial.datosDinamicos.forEach((dato) => {
  //         console.log(dato);
  //         agregados.push({
  //           text: dato.clave + ': ' + dato.valor,
  //         });
  //       });
  //       const data: TDocumentDefinitions = {
  //         content: [
  //           {
  //             text:
  //               'Historia clínica de: ' +
  //               usuario.nombre +
  //               ' ' +
  //               usuario.apellido,
  //             style: 'header2',
  //           },
  //           {
  //             image: img,
  //             width: 150,
  //           },
  //           {
  //             text:
  //               'Fecha de emisión: ' +
  //               new Date(Date.now()).toLocaleDateString(),
  //             style: 'header',
  //           },
  //           {
  //             text: 'Altura: ' + historial.altura.toString(),
  //           },
  //           {
  //             text: 'Peso: ' + historial.peso.toString(),
  //           },
  //           {
  //             text: 'Temperatura: ' + historial.temperatura.toString(),
  //           },
  //           {
  //             text: 'Presion: ' + historial.presion.toString(),
  //           },
  //           {
  //             text: 'Diagnósticos: ',
  //             style: 'header',
  //           },
  //           agregados!,
  //         ],
  //         styles: {
  //           header: {
  //             bold: true,
  //             fontSize: 15,
  //             alignment: 'center',
  //             margin: 5,
  //           },
  //           header2: {
  //             bold: true,
  //             fontSize: 20,
  //             alignment: 'center',
  //             margin: 2,
  //           },
  //         },
  //         defaultStyle: {
  //           alignment: 'center',
  //           fontSize: 12,
  //         },
  //       };

  //       pdfMake.createPdf(data).download();
  //     };
  //   };
  //   request.send();
  // }
}
