import { TarefaProvider } from './../../providers/tarefa/tarefa';
import { LovProvider } from './../../providers/lov/lov';
import { Tarefa } from './../../model/tarefa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tarefas-add',
  templateUrl: 'tarefas-add.html',
})
export class TarefasAddPage {

  tarefa: Tarefa;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public tarefaProvider: TarefaProvider,
    public lovProvider: LovProvider) {

    this.tarefa = new Tarefa();
  }

  ionViewDidLoad() {
    this.tarefa = this.navParams.get('tarefa');
    if (!this.tarefa) {
      this.tarefa = new Tarefa();
    }
  }


  salvarTarefa() {
    console.log(this.tarefa);
    this.tarefaProvider.save(this.tarefa);

  }

}
