import { TarefaProvider } from './../../providers/tarefa/tarefa';
import { LovProvider } from './../../providers/lov/lov';
import { Tarefa } from './../../model/tarefa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { EstadoTarefa } from '../../model/estadoTarefa';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-tarefas-add',
  templateUrl: 'tarefas-add.html',
})
export class TarefasAddPage {

  tarefa: Tarefa;
  tarefaForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public tarefaProvider: TarefaProvider,
    public viewCtrl: ViewController,
    public fb: FormBuilder,
    public lovProvider: LovProvider) {
    this.initialize();

  }


  private initialize() {
    this.tarefa = this.navParams.get('tarefa');
    if (!this.tarefa) {
      this.tarefa = new Tarefa();
    }

    this.tarefaForm = this.fb.group({
      'titulo': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'descricao': [''],
      'estadoTarefa': ['', Validators.required]
    });
  }

  ionViewDidLoad() {

  }

  getEstadoValue(estadoTarefa: EstadoTarefa): string {
    return EstadoTarefa[estadoTarefa];
  }

  salvarTarefa() {
    //console.log(this.tarefa);
    this.tarefaProvider.save(this.tarefa);
    this.viewCtrl.dismiss();

  }

}
