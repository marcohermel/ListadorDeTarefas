import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Credencial } from './../../model/credencial';
import firebase from "firebase";

@Injectable()
export class LoginProvider {

  currentUser: any;
  autenticado: boolean;
  loginSucessoEventEmitter: EventEmitter<any>;
  loginFalhaEventEmitter: EventEmitter<any>;
  logoutEventEmitter: EventEmitter<any>;

  constructor(public http: Http, public ngZone: NgZone) {

    this.loginSucessoEventEmitter = new EventEmitter();
    this.loginFalhaEventEmitter = new EventEmitter();
    this.logoutEventEmitter = new EventEmitter();

    firebase.auth().onAuthStateChanged(usuario => {
      this.callBackStateChange(usuario);

      console.log({"usuario:" : usuario} );
      if(usuario){
        firebase.auth().getRedirectResult()
        .then(resultado => this.callBackSuccessLogin(resultado))
        .catch(error => this.callBackFalhaLogin(error));
      }

    
    })

  }

  private callBackStateChange(usuario) {
    this.ngZone.run(() => {
      if (usuario == null) {
        this.currentUser = null;
        this.autenticado = false;
      } else {
        this.currentUser = usuario;
        this.autenticado = true;
      }
    })
  }

  loginWithCredentials(credencial: Credencial) {
    firebase.auth().signInWithEmailAndPassword(credencial.email, credencial.senha)
      .then(resultado => this.callBackSuccessLogin(resultado))
      .catch(error => this.callBackFalhaLogin(error))
  }

  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
    .then(resultado => this.callBackSuccessLogin(resultado))
    .catch(error => this.callBackFalhaLogin(error));

  }

  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(resultado => this.callBackSuccessLogin(resultado))
      .catch(error => this.callBackFalhaLogin(error))
  }

  registrarUsuario(credencial: Credencial) {
    firebase.auth().createUserWithEmailAndPassword(credencial.email, credencial.senha)
      .then(result => console.log(result))
      .catch(error => console.log(error))
    // console.log(credencial);
  }

  private callBackSuccessLogin(response) {
    this.loginSucessoEventEmitter.emit(response.user);
  }
  private callBackFalhaLogin(error) {
    this.loginFalhaEventEmitter.emit({ code: error.code, message: error.message, email: error.email, credencial: error.credencial });
  }

  logOut() {
    firebase.auth().signOut()
      .then(() => this.logoutEventEmitter.emit(true))
      .catch(error => this.callBackFalhaLogin(error));
  }
}