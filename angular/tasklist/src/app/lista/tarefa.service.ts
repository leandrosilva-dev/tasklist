import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskType } from './tasktype';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'nao-implementado'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  doOperation(operation : String, task : TaskType = null) : Observable<TaskType[]> {
    switch(operation){
      case "insert":
        return this.insTarefa(task);
        break;
      case "update":
        return this.altTarefa(task);
        break;
      case "delete":
        return this.delTarefa(task);
        break;
      case "getAll":
        return this.getAll();  
        break;
      default:
        return null;
    }
  }

  private getAll(): Observable<TaskType[]> {
    return this.http.get<TaskType[]>("http://localhost:8080/getAll", httpOptions).pipe();
  }

  private insTarefa(task : TaskType): Observable<TaskType[]> {
    return this.http.post<TaskType[]>("http://localhost:8080/insTarefa", task, httpOptions).pipe();
  }

  private altTarefa(task : TaskType): Observable<TaskType[]> {
    return this.http.put<TaskType[]>("http://localhost:8080/altTarefa", task, httpOptions).pipe();
  }

  private delTarefa(task : TaskType): Observable<any[]> {
    return this.http.delete<any[]>("http://localhost:8080/delTarefa/" + task.task_id, httpOptions).pipe();
  }
}