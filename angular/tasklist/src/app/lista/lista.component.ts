import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TarefaService} from './tarefa.service';
import { TaskType } from './tasktype';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  todo  : TaskType[];
  doing : TaskType[];
  done  : TaskType[];
  trash : TaskType[];
  checked : boolean = false;

  constructor(private tarefaService: TarefaService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.atualizarCard();
  }

  semAcessoBase() : void{
    this.checked = !this.checked;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    let status = 'TODO';
    let descricao = '';
    dialogConfig.data = {status, descricao};

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if(data != undefined && data['titulo'] != undefined){
        let task = {
          titulo : data['titulo'],
          status : 'TODO',
          descricao : data['descricao'],
          data_criacao : this.gerarData()
        } as TaskType;
  
        if(this.checked){
          if(this.todo == undefined){
            this.todo = [];
            this.doing = [];
            this.done = [];
            this.trash = [];
          }

          this.todo.push(task);
        } else{
          this.tarefaService.doOperation('insert', task).subscribe((response) => {
            if(response['result']['sucesso'] as boolean){
              this.todo.push(response['result']['task']);
            }
    
            this.openSnackBar(response['result']['mensagem'], '');
          });
        }
      }
    }
  );
}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  atualizarCard() : void{
    this.tarefaService.doOperation('getAll') .subscribe(tasks => {
      this.todo = tasks["result"]["tasks"].filter((task) => {return task.status == 'TODO'}); 
      this.doing = tasks["result"]["tasks"].filter((task) => {return task.status == 'DOING'}); 
      this.done = tasks["result"]["tasks"].filter((task) => {return task.status == 'DONE'}); 
      this.trash = tasks["result"]["tasks"].filter((task) => {return task.data_exclusao != undefined && task.data_exclusao != 'null' && task.data_exclusao.trim() != ''}); 
    });
  }

  deleteTarefa(task_id : number) : void{
    if(confirm("Tem certeza que deseja excluir a tarefa?")) {
      let task = this.trash.filter((data) => {return data.task_id == task_id});
    
      if(this.checked){
        this.trash = this.trash.filter((data) => {
          return data.task_id != task_id;
        });
      }else{
        this.tarefaService.doOperation('delete', task[0]).subscribe((response) => {
          if(response['result']['sucesso'] as boolean){
            this.trash = this.trash.filter((data) => {
              return data.task_id != task_id;
            }); 
          }
    
          this.openSnackBar(response['result']['mensagem'], '');
        });
      } 
    }
  }

  drop(event: CdkDragDrop<string[]>) {      
    if(event.previousContainer === event.container){
      this.atualizarLista(event);
    }else{
      let task : TaskType;
      let operation : String;
      let data = this.gerarData();

      if(event.container.element.nativeElement.id == 'TODO'){
        if(event.previousContainer.element.nativeElement.id == 'DOING'){
          task = this.doing[event.previousIndex];
        }else if(event.previousContainer.element.nativeElement.id == 'DONE'){
          task = this.done[event.previousIndex];
        }else if(event.previousContainer.element.nativeElement.id == 'TRASH'){
          task = this.trash[event.previousIndex];
        }

        task.status = 'TODO';
        task.data_conclusao = '';
        task.data_edicao = data;
        operation = 'update';
      }else if(event.container.element.nativeElement.id == 'DOING'){
        if(event.previousContainer.element.nativeElement.id == 'TODO'){
          task = this.todo[event.previousIndex];
        }else if(event.previousContainer.element.nativeElement.id == 'DONE'){
          task = this.done[event.previousIndex];
        }else if(event.previousContainer.element.nativeElement.id == 'TRASH'){
          task = this.trash[event.previousIndex];
        }

        task.status = 'DOING';
        task.data_conclusao = '';
        task.data_edicao = data;
        operation = 'update';
      }else if(event.container.element.nativeElement.id == 'DONE'){
        if(event.previousContainer.element.nativeElement.id == 'TODO'){
          task = this.todo[event.previousIndex];
        }else if(event.previousContainer.element.nativeElement.id == 'DOING'){
          task = this.doing[event.previousIndex];
        }else if(event.previousContainer.element.nativeElement.id == 'TRASH'){
          task = this.trash[event.previousIndex];
        }

        task.status = 'DONE';
        task.data_conclusao = data;
        task.data_edicao = data;
        operation = 'update';
      }else if(event.container.element.nativeElement.id == 'TRASH'){
        if(event.previousContainer.element.nativeElement.id == 'TODO'){
          task = this.todo[event.previousIndex];
        }else if(event.previousContainer.element.nativeElement.id == 'DOING'){
          task = this.doing[event.previousIndex];
        }else if(event.previousContainer.element.nativeElement.id == 'DONE'){
          task = this.done[event.previousIndex];
        }

        task.status = 'TRASH';
        task.data_conclusao = data;
        task.data_edicao = data;
        task.data_exclusao = data;
        operation = 'update';
      } 

      if(this.checked){
        this.atualizarLista(event);
      }else{
        this.tarefaService.doOperation(operation, task).subscribe((response) => {
          if(response['result']['sucesso'] as boolean){
            this.atualizarLista(event);
          }
  
          this.openSnackBar(response['result']['mensagem'], '');
        });
      }
    }
  }

  private atualizarLista(event: CdkDragDrop<string[]>) : void{
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  private gerarData() : string{
    let today = new Date();

    return today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  }
}