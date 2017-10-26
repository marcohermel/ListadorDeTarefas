import { Tarefa } from './../../model/tarefa';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tarefa-list-item',
  templateUrl: 'tarefa-list-item.html'
})
export class TarefaListItemComponent {

  @Input()
  tarefa: Tarefa;

}
