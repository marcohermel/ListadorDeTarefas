import { LoginProvider } from './../login/login';
import { Tarefa } from './../../model/tarefa';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class TarefaProvider {

  reference;

  constructor(public http: Http, public loginProvider: LoginProvider) {
    this.initialize();
  }

  private initialize() {
    this.reference = firebase.database().ref(this.loginProvider.currentUser.uid + '/tarefas/');
  }


  save(tarefa: Tarefa) {
    let refKey;
    //update
    if (tarefa.keyReference != undefined) {
      refKey = tarefa.keyReference;
    } else {
      //insert
      refKey = this.reference.push().key;
      tarefa.keyReference = refKey;
    }
    this.reference.child(refKey).update(tarefa);
  }

  deletar(tarefa: Tarefa) {
    return this.reference.child(tarefa.keyReference).remove();
  }

  getAll(): Array<Tarefa> {
    return new Array();
  }

  adicionar(tarefa: Tarefa) {

  }
}
