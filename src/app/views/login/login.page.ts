import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  emailError = false;
  passError = false;
  errorMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'El correo electrónico es requerido.' },
      { type: 'pattern', message: 'Ingresa un correo electrónico valido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerido.' },
      { type: 'minlength', message: 'La contraseña debe contener mínimo 6 caracteres.' }
    ]
  };

  constructor(private auth: AuthService, private router: Router,) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(6),
      ])),
    })
  }

  ngOnInit(): void {
    this.onChanges();
  }

  get f(){
    return this.loginForm.controls;
  }

  onChanges() {
  }

  login(){
    this.auth.signInWithEmail(this.loginForm.value['email'], this.loginForm.value['password'])
    .then(user =>{
      this.rediretLoggedUserToProfilePage();
    }).catch(error =>{
      console.log(error);
      switch(error.code){
        case 'auth/user-not-found':
          this.errorMessage = 'El correo proporcionado no existe';
          break;
        case 'auth/wrong-password':
          this.errorMessage='La contraseña es incorrecto';
          break;
        default:
          this.errorMessage = error.message;
      }
    })
  }

  rediretLoggedUserToProfilePage() {
    this.router.navigate(['home'], {replaceUrl: true})
  }

}
