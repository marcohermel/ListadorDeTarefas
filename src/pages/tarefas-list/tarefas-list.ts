import { LoginProvider } from './../../providers/login/login';
import { TarefasAddPage } from './../tarefas-add/tarefas-add';
import { TarefaProvider } from './../../providers/tarefa/tarefa';
import { Tarefa } from './../../model/tarefa';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

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
    public toastCtrl: ToastController,
    public ngZone: NgZone) { }



  ionViewDidLoad() {
    /*
     *value - Escuta todas as alterações da referência
     *child_added - Ouvinte para quando um filho for adicionado
     *child_changed - Ouvinte para quando um algum for alterado
     *child_removed - Ouvinte para quando um algum for removido
     *child_moved = Ouvinte para ouvir as mudanças na prioridade de um filho
     */

    this.tarefaProvider.reference.limitToLast(1).on('child_added', (snapshot) => {
      let tarefaRemovida = snapshot.val();
      this.toastCtrl.create({
        message: 'Tarefa ' + tarefaRemovida.titulo + ' adicionada com sucesso!',
        duration: 3000
      }).present();
    }) 

    this.tarefaProvider.reference.on('child_changed', (snapshot) => {
      let tarefaRemovida = snapshot.val();
      this.toastCtrl.create({
        message: 'Tarefa ' + tarefaRemovida.titulo + ' alterada com sucesso!',
        duration: 3000
      }).present();
    })

    this.tarefaProvider.reference.on('child_removed', (snapshot) => {
      let tarefaRemovida = snapshot.val();
      this.toastCtrl.create({
        message: 'Tarefa ' + tarefaRemovida.titulo + ' removida com sucesso!',
        duration: 3000
      }).present();
    })



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

  sair() {
    this.loginProvider.logOut();
  }
}
