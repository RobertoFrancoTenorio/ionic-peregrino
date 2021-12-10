import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User, auth } from 'firebase/app';
import { Router } from "@angular/router";
import { from, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  dataUser: any;
  userProviderAdditionalInfo: any;
  redirectResult: Subject<any> = new Subject<any>();
  currentRole:string;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
  ) {
    this.afAuth.onAuthStateChanged(async (user) =>{
      //console.log(user);
      if(user!=null){
        this.currentUser = user;
        await this.getUserData();
      }
    })
  }

  userDetails() {
    return this.afAuth.user
  }

  async getUserData() {
    return new Promise(resolve => {
      this.afs.doc('/SegMedico/peregrino/usuarios/' + this.currentUserId).valueChanges().subscribe(data =>{
        this.dataUser = data;
        resolve('success');
      })
    })
  }

  get isLoggedIn(): boolean {
    return this.currentUser !== undefined;
  }

  get currentUserId(): string {
    return this.isLoggedIn ? this.currentUser.uid : '';
  }

  getLoggedInUser(){
    return this.currentUser;
  }

  signOut(): Observable<any>{
    return from(this.afAuth.signOut().then(() => {
      this.router.navigate(['login'], {replaceUrl: true});
    }))
  }

  signInWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
    console.log('email: ' + email, 'password: ' + password);
  }

  signUpWithEmail(email: string, password: string): Promise<auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}
