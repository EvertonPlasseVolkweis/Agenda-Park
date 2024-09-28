import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalSucessoComponent } from '../../modal-sucesso/modal-sucesso.component';
import { EquipamentoService } from './equipamento.service';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.css']
})
export class EquipamentosComponent implements OnInit, OnDestroy {

  public formularioEquipamento: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public equipamentoService: EquipamentoService,
    public router: Router,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.formularioEquipamento = this.formBuilder.group({
      nome: [null],
      tipo: [null],
      marca: [null],
      modelo: [null],
      patrimonio: [null],
      localizacao: [null],
      status: [null],
      deletado: false
    })
    var idSelecionado = localStorage.getItem("idSelecionado");
    if (idSelecionado) {
      var token = localStorage.getItem("token");
      this.equipamentoService.getEquipamentoPorId(`${token}`, idSelecionado).subscribe((res: any) => {
        this.formularioEquipamento.controls['nome'].setValue(res.nome);
        this.formularioEquipamento.controls['tipo'].setValue(res.tipo);
        this.formularioEquipamento.controls['marca'].setValue(res.marca);
        this.formularioEquipamento.controls['modelo'].setValue(res.modelo);
        this.formularioEquipamento.controls['patrimonio'].setValue(res.patrimonio);
        this.formularioEquipamento.controls['localizacao'].setValue(res.localizacao);
        this.formularioEquipamento.controls['status'].setValue(res.status);
      });
    }
  }

  public salvarEquipamento() {
    var token = localStorage.getItem("token");
    var idSelecionado = localStorage.getItem("idSelecionado");
    if (idSelecionado) {
      this.equipamentoService.editaEquipamento(this.formularioEquipamento.value, `${token}`, idSelecionado).subscribe(data => {
        this.dialog.open(ModalSucessoComponent, {
          data: {
            titulo: "Sucesso",
            texto: "Equipamento editado com Sucesso!",
          }
        });
        this.router.navigate(['/', 'equipamento-lista']);
      });
    } else {
      this.equipamentoService.saveEquipamento(this.formularioEquipamento.value, `${token}`).subscribe(data => {
        this.dialog.open(ModalSucessoComponent, {
          data: {
            titulo: "Sucesso",
            texto: "Equipamento cadastrado com Sucesso!",
          }
        });
        this.router.navigate(['/', 'equipamento-lista']);
      });
    }

  } 

  telaTabelaEquipamento() {
    this.router.navigate(['/', 'equipamento-lista']);
  }

  ngOnDestroy(): void {
    localStorage.removeItem("idSelecionado");
  }

}
