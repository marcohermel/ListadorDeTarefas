import { Credencial } from './../../model/credencial';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginProvider } from './../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  
    credencial: Credencial;
  
    constructor(public navCtrl: NavController, public loginProvider: LoginProvider) {
      this.credencial = new Credencial();
    }
  
    doRegister() {
      this.loginProvider.registrarUsuario(this.credencial);
    }
  

}
