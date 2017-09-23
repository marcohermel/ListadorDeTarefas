import { Credencial } from './../../model/credencial';
import { LoginProvider } from './../../providers/login/login';
import { RegistrarPage } from './../registrar/registrar';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credencial: Credencial;

  constructor(public navCtrl: NavController, public loginProvider: LoginProvider) {
    this.credencial = new Credencial();
  }

  ionViewDidLoad() {
    this.loginProvider.loginSucessoEventEmitter.subscribe(user => console.log(user));
    this.loginProvider.loginFalhaEventEmitter.subscribe(error => console.log(error));

  }

  loginWithCredencials() {
    this.loginProvider.loginWithCredentials(this.credencial);
  }
  loginWithGoogle() {
    this.loginProvider.loginWithGoogle();
  }

  doRegister() {
    this.navCtrl.push(RegistrarPage);
  }

  sair(){
    this.loginProvider.logOut();
  }

}
