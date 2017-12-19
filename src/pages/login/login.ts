import { TarefasListPage } from './../tarefas-list/tarefas-list';
import { Credencial } from './../../model/credencial';
import { LoginProvider } from './../../providers/login/login';
import { RegistrarPage } from './../registrar/registrar';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credencial: Credencial;

  constructor(public navCtrl: NavController,
    public loginProvider: LoginProvider,
    public menuCtrl: MenuController) {
      this.initialize();
  }

  private initialize() {
    this.credencial = new Credencial(); 
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeEnable(true);
  }

  ionViewDidLoad() {

    this.loginProvider.loginSucessoEventEmitter.subscribe(() => this.navCtrl.setRoot(TarefasListPage));
    this.loginProvider.loginFalhaEventEmitter.subscribe(error => alert("erro: " + error.message));

    this.loginProvider.logoutEventEmitter.subscribe(user => this.navCtrl.setRoot(LoginPage));

  }

  loginWithCredencials() {
    this.loginProvider.loginWithCredentials(this.credencial);
  }

  loginWithGoogle() {
    this.loginProvider.loginWithGoogle();
  }

  loginWithFacebook() {
    this.loginProvider.loginWithFacebook();
  }

  doRegister() {
    this.navCtrl.push(RegistrarPage);
  }

  sair() {
    this.loginProvider.logOut();
  }

}
