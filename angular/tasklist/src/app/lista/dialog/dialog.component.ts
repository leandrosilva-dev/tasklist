import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TaskType } from './../tasktype';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  form      : FormGroup;
  titulo    : String;
  descricao : String;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) {titulo,descricao}:TaskType ) { 

    this.titulo = titulo;
    this.descricao = descricao;

    this.form = fb.group({
      descricao: [descricao, Validators.required],
      titulo: [titulo, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  save() : void {
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }else{
      alert('Preencha todos os campos');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
