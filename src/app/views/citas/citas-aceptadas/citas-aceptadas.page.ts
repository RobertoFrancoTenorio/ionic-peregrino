import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CitaService } from 'src/app/services/citas/cita.service';
import { NavigationExtras, Router} from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-citas-aceptadas',
  templateUrl: './citas-aceptadas.page.html',
  styleUrls: ['./citas-aceptadas.page.scss'],
})
export class CitasAceptadasPage implements OnInit {
  citas = []
  constructor(
    private citaService: CitaService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.citaService.getCitasEstatus(this.auth.currentUserId, 'aceptada').subscribe(data => {
      console.log(data);
      this.citas = data;
      for(var i = 0; i < data.length; i++) {
        console.log('citas', this.citas[i]);
        console.log(this.citas[i]['f_cita'])
        this.citas[i]['f_cita'] = moment(data[i]['f_cita'].seconds*1000).format('YYYY-MM-DD');
      }
    })
  }

  realizarConsulta(cita: any){
    Swal.fire({
      icon: 'question',
      title: '¿Desea realizar esta consulta?',
      text: '¿Obtuvo respuesta del paciente?',
      footer: '<ion-icon style="color: red" name="fitness-outline"></ion-icon>',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#2fdf75",
      cancelButtonColor: "#ff4961",
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then(result => {
      if(result.isConfirmed){
        this.goToConsulta(cita.extendedProps.currentCita)
      }
      else if(result.isDenied){

      }
    })
  }

  goToConsulta(data: any){
    const navigationExtras: NavigationExtras = {
      state: {
        infoCita: data,
      }
    };
    this.router.navigate(['consulta'], navigationExtras);
  }

}
