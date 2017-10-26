import { LoginProvider } from './../../providers/login/login';
import { TarefasAddPage } from './../tarefas-add/tarefas-add';
import { TarefaProvider } from './../../providers/tarefa/tarefa';
import { Tarefa } from './../../model/tarefa';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tarefas-list',
  templateUrl: 'tarefas-list.html',
})
export class TarefasListPage {


  tarefas: Array<Tarefa> = [];

  constructor(public navCtrl: NavController,
    public tarefaProvider: TarefaProvider,
     public loginProvider: LoginProvider,
    public ngZone: NgZone) { }



  ionViewDidLoad() {
    this.tarefaProvider.reference.on('value', (snapshot) => {
      
      this.ngZone.run(() => {
        let innerArray = new Array();

        snapshot.forEach(elemento => {
          let el = elemento.val();
          innerArray.push(el);
        });

        this.tarefas = innerArray;
      })
      
    })
    //this.tarefas = this.tarefaProvider.getAll();

    this.loginProvider.logoutEventEmitter.subscribe(error => console.log(error));
  }

  adicionarTarefa() {
    this.navCtrl.push(TarefasAddPage, { 'tarefa': new Tarefa() });
  }

  atualizarTarefa(tarefa: Tarefa) {
    this.navCtrl.push(TarefasAddPage, { 'tarefa': tarefa })
  }

  deletarTarefa(tarefa: Tarefa) {
    this.tarefaProvider.deletar(tarefa).then(
      sucesso => console.log('tarefa deletada')
    ).catch(error => console.log('não foi possível deletar a tarefa'))
  }

  sair(){
    this.loginProvider.logOut();
  }
}
