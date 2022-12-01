import { Xliff } from '@angular/compiler';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Admin } from 'src/app/clases/admin';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';
import * as XLXS from 'xlsx';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  pacientes: Paciente[] = [];
  especialistas: Especialista[] = [];
  admins: Admin[] = [];
  tabla: string;
  color: string = '';
  fileName = 'usuarios.xlsx';
  @ViewChild("navEsp") navEsp: ElementRef | undefined;
  @ViewChild("navPac") navPac: ElementRef | undefined;
  @ViewChild("navAdmin") navAdmin: ElementRef | undefined;
  @ViewChild("navRegistro") navRegistro: ElementRef | undefined;
  @ViewChild("navPerfil") navPerfil: ElementRef | undefined;
  @ViewChild("navInformes") navInformes: ElementRef | undefined;

  constructor(private auth: UserService,
    private firestore: Firestore,
    private renderer: Renderer2,
    private router: Router) {
    this.traerPacientes(this.pacientes);
    this.traerEspecialistas(this.especialistas);
    this.traerAdmins(this.admins);
    this.tabla = "USUARIOS";
  }

  addMyClass() {
    switch (this.tabla) {
      case "ESPECIALISTAS":
        this.renderer.addClass(this.navEsp?.nativeElement, "active");
        this.renderer.removeClass(this.navPac?.nativeElement, "active");
        this.renderer.removeClass(this.navAdmin?.nativeElement, "active");
        this.renderer.removeClass(this.navRegistro?.nativeElement, "active");
        this.renderer.removeClass(this.navPerfil?.nativeElement, "active");
        this.renderer.removeClass(this.navInformes?.nativeElement, "active");



        break;
      case "PACIENTES":
        this.renderer.addClass(this.navPac?.nativeElement, "active");
        this.renderer.removeClass(this.navEsp?.nativeElement, "active");
        this.renderer.removeClass(this.navAdmin?.nativeElement, "active");
        this.renderer.removeClass(this.navRegistro?.nativeElement, "active");
        this.renderer.removeClass(this.navPerfil?.nativeElement, "active");
        this.renderer.removeClass(this.navInformes?.nativeElement, "active");



        break;
      case "ADMINS":
        this.renderer.addClass(this.navAdmin?.nativeElement, "active");
        this.renderer.removeClass(this.navEsp?.nativeElement, "active");
        this.renderer.removeClass(this.navPac?.nativeElement, "active");
        this.renderer.removeClass(this.navRegistro?.nativeElement, "active");
        this.renderer.removeClass(this.navInformes?.nativeElement, "active");
        this.renderer.removeClass(this.navPerfil?.nativeElement, "active");


        break;
      case "USUARIOS":
        this.renderer.removeClass(this.navAdmin?.nativeElement, "active");
        this.renderer.removeClass(this.navEsp?.nativeElement, "active");
        this.renderer.removeClass(this.navPac?.nativeElement, "active");
        this.renderer.removeClass(this.navRegistro?.nativeElement, "active");
        this.renderer.removeClass(this.navPerfil?.nativeElement, "active");
        this.renderer.removeClass(this.navInformes?.nativeElement, "active");


        break;
      case "REGISTRO":
        this.renderer.addClass(this.navRegistro?.nativeElement, "active");
        this.renderer.removeClass(this.navAdmin?.nativeElement, "active");
        this.renderer.removeClass(this.navEsp?.nativeElement, "active");
        this.renderer.removeClass(this.navPac?.nativeElement, "active");
        this.renderer.removeClass(this.navPerfil?.nativeElement, "active");
        this.renderer.removeClass(this.navInformes?.nativeElement, "active");

        break;
      case "PERFIL":
        this.renderer.addClass(this.navPerfil?.nativeElement, "active");
        this.renderer.removeClass(this.navAdmin?.nativeElement, "active");
        this.renderer.removeClass(this.navEsp?.nativeElement, "active");
        this.renderer.removeClass(this.navPac?.nativeElement, "active");
        this.renderer.removeClass(this.navRegistro?.nativeElement, "active");
        this.renderer.removeClass(this.navInformes?.nativeElement, "active");
        break;
      case "INFORMES":
        this.renderer.addClass(this.navInformes?.nativeElement, "active");
        this.renderer.removeClass(this.navPerfil?.nativeElement, "active");
        this.renderer.removeClass(this.navAdmin?.nativeElement, "active");
        this.renderer.removeClass(this.navEsp?.nativeElement, "active");
        this.renderer.removeClass(this.navPac?.nativeElement, "active");
        this.renderer.removeClass(this.navRegistro?.nativeElement, "active");
        break;
    }
  }

  ngOnInit(): void {
    this.getUsuarios(); //???
    this.getEspecialistas()
  }

  abrirMiPerfil() {
    this.router.navigateByUrl("mi-perfil");
  }

  async traerPacientes(pacientes: Paciente[]) {
    await this.auth.traerPacientes(pacientes);
  }
  async traerEspecialistas(especialistas: Especialista[]) {
    await this.auth.traerEspecialistas(especialistas);
  }
  async traerAdmins(admins: Admin[]) {
    await this.auth.traerAdmins(admins);
  }

  getUsuarios() {
    this.auth.getUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

  getEspecialistas() {
    this.auth.getEspecialistas().subscribe((data: Especialista[]) => {
      this.especialistas = data;
    });
  }


  async cambiarEstado(especialista: Especialista) {
    try {
      const postDocRef = doc(this.firestore, `users/${especialista.uid}`);
      let activo = !especialista.activo;
      await updateDoc(postDocRef, { activo });
      return true;
    } catch (e) {
      return e;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/bienvenida");
  }

  exportexcel() {
    let element = document.getElementById('excel-table');
    const ws: XLXS.WorkSheet = XLXS.utils.table_to_sheet(element);

    const wb: XLXS.WorkBook = XLXS.utils.book_new();
    XLXS.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLXS.writeFile(wb, this.fileName);
  }
}
