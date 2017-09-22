import { EstadoTarefa } from "./estadoTarefa";

export class Tarefa { 
    codigo:number;
    titulo:string;
    descricao:string;
    estado: EstadoTarefa;
}