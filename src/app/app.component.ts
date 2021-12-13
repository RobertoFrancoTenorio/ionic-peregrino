import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CitaService } from './services/citas/cita.service';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  asignada = null;
  usuario = null;
  doctor: boolean = false;
  aceptadas: number = 0;

  constructor(
    private menuCtrl: MenuController,
    private auth: AuthService,
    private cita: CitaService,
    private router: Router
  ) {

  }

  async ngOnInit() {
    this.menuCtrl.enable(false)
    this.auth.userDetails().subscribe(async (user) => {
      if(user!=null){
        this.auth.currentUser = user;
        await this.auth.getUserData();
        //this.auth.signOut();
        this.determinaUsuario(this.auth.dataUser.is_Doctor);
        }
    })
  }

  logout(){
    this.menuCtrl.close();
    this.auth.signOut();
    this.usuario = false;
    this.doctor = false;
    console.log('logout');
  }

  determinaUsuario(data: any){
    if(data == 'Si'){
      this.usuario = true;
      this.doctor = true;
      //console.log(data)
      this.numeroCitas();
    }
    else{
      this.usuario = true;
    }
  }

  numeroCitas(){
    this.cita.getCitasAsignadasDoctor(this.auth.dataUser.id).subscribe(data =>{
      this.asignada = data.length;
    });
    this.cita.getCitasEstatus(this.auth.currentUserId, 'aceptada').subscribe(data =>{
      this.aceptadas = data.length;
    })
  }

  goToCitas(){
    this.menuCtrl.close();
    this.router.navigate(['/citas'])
  }

  goToCitasAceptadas(){
    this.menuCtrl.close();
    this.router.navigate(['/citas-aceptadas'])
  }
}
