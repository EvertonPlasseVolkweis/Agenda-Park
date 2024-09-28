import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalRecusaComponent } from '../modal-recusa/modal-recusa.component';
import { ModalSucessoComponent } from '../modal-sucesso/modal-sucesso.component';
import { SolicitacoesService } from './service/solicitacoes.service';

export interface PeriodicElement {
nome: string;
endereco: string;
}

@Component({
selector: 'app-lista-solicitacoes',
templateUrl: './lista-solicitacoes.component.html',
styleUrls: ['./lista-solicitacoes.component.css']
})
export class ListaSolicitacoesComponent implements OnInit {


displayedColumns: string[] = ['nome', 'endereco', 'editEmployee', 'deleteEmployee'];
dataSource: any;

constructor(
  private router: Router,
  private solicitacoesService: SolicitacoesService,
  private dialog: MatDialog,
  ) {}

ngOnInit(): void {
  var token = localStorage.getItem("token");
  this.solicitacoesService.getSolicitacoes(`${token}`).subscribe((res: any) => {
    this.dataSource = res;
  });
}

recusar(id: number) {
  const dialogRef = this.dialog.open(ModalRecusaComponent, {
    data: {
      idSelecionado: id,
      service: "usuario",
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    var token = localStorage.getItem("token");
    setTimeout(() => {
      this.dataSource = [];
      this.solicitacoesService.getSolicitacoes(`${token}`).subscribe((res: any) => {
        this.dataSource = res;
      })
    }, 3000)
  });
}

aceitar(id: number) {
  var token = localStorage.getItem("token");
  this.solicitacoesService.aceitaSolicitacao(`${token}`, id).subscribe((res) => {
    this.dialog.open(ModalSucessoComponent, {
      data: {
        titulo: "Sucesso",
        texto: "Solicitação Aceita com Sucesso!",
      }
    });
  }
  // ,error => {
  //   console.log('asdasd');
  //   this.dialog.closeAll();
  //   this.openModal("Erro", error.error);
  // }
  );
  setTimeout(() => {
    this.dataSource = [];
    this.solicitacoesService.getSolicitacoes(`${token}`).subscribe((res: any) => {
      this.dataSource = res;
    });
  }, 3000);
}

openModal(titulo, texto) {
  this.dialog.open(ModalSucessoComponent, {
    data: {
      titulo: titulo,
      texto: texto,
    }
  });
}

@ViewChild(MatTable) table: MatTable<PeriodicElement> | any;
}
