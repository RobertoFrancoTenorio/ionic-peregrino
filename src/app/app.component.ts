import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  vistas = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'fa-home',
    },
    {
      title: 'Salir',
      url: '/login',
      icon: 'fa-home',
    }
  ]

  vistasDoctor = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'fa-home',
    },
    {
      title: 'Consultas',
      url: '/login',
      icon: 'fa-home',
    }
  ]

  vistasAsistente = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'fa-home',
    },
    {
      title: 'Pacientes',
      url: '/login',
      icon: 'fa-home',
    }
  ]

  usuario;
  constructor(
    private menu: MenuController,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.userDetails().subscribe(async (user) => {
      console.log('user', user);
      if(user==null){
        this.vistas = []
        this.usuario = false
      }
      if(user!=null){
        this.auth.currentUser = user;
        await this.auth.getUserData();
        if(this.auth.dataUser.is_Doctor == 'Si'){
          this.vistas = this.vistasDoctor;
          this.usuario = true;
          }
        else{
          this.vistas = this.vistasAsistente;
          this.usuario = true;
        }
        }
      }
    )
  }

  logout(){
    this.menu.close();
    this.auth.signOut();
    console.log('logout');
  }
}
