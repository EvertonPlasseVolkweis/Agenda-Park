import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalSucessoComponent } from '../modal-sucesso/modal-sucesso.component';
import { PredioService } from '../predio-lista/predio.service';

@Component({
  selector: 'app-predio',
  templateUrl: './predio.component.html',
  styleUrls: ['./predio.component.css']
})
export class PredioComponent implements OnInit, OnDestroy {

  public formularioPredio!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public predioService: PredioService,
    public router: Router,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.formularioPredio = this.formBuilder.group({
      nome: [null],
      endereco: [null],
      deletado: false
    });
    var idSelecionado = localStorage.getItem("idSelecionado");
    if (idSelecionado) {
      var token = localStorage.getItem("token");
      this.predioService.getPredioPorId(`${token}`, idSelecionado).subscribe((res: any) => {
        this.formularioPredio.controls['nome'].setValue(res.nome);
        this.formularioPredio.controls['endereco'].setValue(res.endereco);
      });
    }
  }

  telaTabelaPredio() {
    this.router.navigate(['/', 'predio-lista']);
  }

  public salvarPredio() {
    var token = localStorage.getItem("token");
    var idSelecionado = localStorage.getItem("idSelecionado");
    if(idSelecionado) {
      this.predioService.editaPredio(this.formularioPredio.value, `${token}`, idSelecionado).subscribe(data => {
        this.dialog.open(ModalSucessoComponent, {
          data: {
            titulo: "Sucesso",
            texto: "Prédio editado com Sucesso!",
          }
        });
        this.router.navigate(['/', 'predio-lista']);
      });
    } else {
      this.predioService.savePredio(this.formularioPredio.value, `${token}`).subscribe(data => {
        this.dialog.open(ModalSucessoComponent, {
          data: {
            titulo: "Sucesso",
            texto: "Prédio cadastrado com Sucesso!",
          }
        });
        this.router.navigate(['/', 'predio-lista']);
      });
    }
  } 

  ngOnDestroy(): void {
    localStorage.removeItem("idSelecionado");
  }
}
