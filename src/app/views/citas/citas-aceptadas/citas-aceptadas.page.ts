import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CitaService } from 'src/app/services/citas/cita.service';
import { PacienteService } from './../../../services/paciente/paciente.service';

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
  currentPaciente;
  detPaciente;
  arrayFechas = [];
  arrayCitas = [];
  array1 = [
    {fecha:'2021-11-26'},
    {fecha:'2021-11-30'},
    {fecha:'2021-11-30'},
    {fecha:'2021-11-27'},
    {fecha:'2021-11-28'},
  ]

  array2 = [
    {fecha:'2021-11-26'},
    {fecha:'2021-11-30'},
  ]
  constructor(
    private citaService: CitaService,
    private auth: AuthService,
    private router: Router,
    private paciente: PacienteService
  ) { }

  ngOnInit() {
    this.citaService.getCitasEstatus(this.auth.currentUserId, 'aceptada').subscribe(data => {
      this.citas = data;
      this.detPaciente = data[0]['extendedProps'].currentCita.detPaciente
      console.log('Citas', this.citas[0].extendedProps.currentCita.comentarios)
      for(var i = 0; i < data.length; i++) {
        this.paciente.getPacienteData(this.citas[i].extendedProps.currentCita.detPaciente.id).subscribe(data =>{
          this.currentPaciente = data;
        })
        this.citas[i]['f_cita'] = moment(data[i]['f_cita'].seconds*1000).format('YYYY-MM-DD');
        this.arrayFechas.push(this.citas[i]['f_cita']);
      }
      this.arrayCitas = this.arrayFechas.filter(this.onlyUnique);
      console.log('Unique', this.arrayCitas)
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
        paciente: this.currentPaciente
      }
    };
    this.router.navigate(['consulta'], navigationExtras);
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

}
