import { TarefaListItemComponent } from './../components/tarefa-list-item/tarefa-list-item';
import { TarefasAddPage } from './../pages/tarefas-add/tarefas-add';
import { TarefasListPage } from './../pages/tarefas-list/tarefas-list';
import { HttpModule } from '@angular/http';
import { RegistrarPage } from './../pages/registrar/registrar';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginProvider } from '../providers/login/login';
import firebase from "firebase";
import { TarefaProvider } from '../providers/tarefa/tarefa';
import { LovProvider } from '../providers/lov/lov';

const firebaseConfig = {
  apiKey: "AIzaSyAgZXL3TcEC_sj06YI7M7rsebBM-ITqbRc",
  authDomain: "listadordetarefas-f79ad.firebaseapp.com",
  databaseURL: "https://listadordetarefas-f79ad.firebaseio.com",
  projectId: "listadordetarefas-f79ad",
  storageBucket: "listadordetarefas-f79ad.appspot.com",
  messagingSenderId: "465936636536"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegistrarPage,
    TarefasListPage,
    TarefaListItemComponent,
    TarefasAddPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegistrarPage,
    TarefasListPage,
    TarefasAddPage,
    TarefaListItemComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    TarefaProvider,
    LovProvider
  ],
})
export class AppModule {

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

}
