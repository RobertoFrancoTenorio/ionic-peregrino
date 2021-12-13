import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  currentCita: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log('CurrentCita', this.router.getCurrentNavigation().extras.state.infoCita);
    if(this.router.getCurrentNavigation() != null){
      this.route.queryParams.subscribe(async params =>{
        if(this.router.getCurrentNavigation().extras.state){
          this.currentCita = this.router.getCurrentNavigation().extras.state.infoCita;
        }
      })
    }
    else{
      this.currentCita = null;
    }
  }

  loadInfo(){

  }
}
