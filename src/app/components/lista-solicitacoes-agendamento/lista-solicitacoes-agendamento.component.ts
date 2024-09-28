import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalRecusaComponent } from '../modal-recusa/modal-recusa.component';
import { ModalSucessoComponent } from '../modal-sucesso/modal-sucesso.component';
import { SolicitacoesAgendamentoService } from './service/solicitacoes-agendamento.service';

export interface PeriodicElement {
dataHoraChegada: string;
dataHoraSaida: string;
laboratorio: string;
atividade: string;
empresaCurso: string;
instituicaoCurso: string;
responsavel: string;
observacao: string;
}

@Component({
selector: 'app-lista-solicitacoes-agendamento',
templateUrl: './lista-solicitacoes-agendamento.component.html',
styleUrls: ['./lista-solicitacoes-agendamento.component.css']
})
export class ListaSolicitacoesAgendamentoComponent implements OnInit {


displayedColumns: string[] = ['dataHoraChegada', 'dataHoraSaida', 'laboratorio', 'atividade', 'empresaCurso', 'instituicaoCurso', 'responsavel', 'observacao', 'editEmployee', 'deleteEmployee'];
dataSource: any;

constructor(
  private router: Router,
  private solicitacoesAgendamentoService: SolicitacoesAgendamentoService,
  private dialog: MatDialog
  ) {}

ngOnInit(): void {
  var token = localStorage.getItem("token");
  this.solicitacoesAgendamentoService.getSolicitacoesAgendamento(`${token}`).subscribe((res: any) => {
    this.dataSource = res;
  });
}

recusar(id: number, motivo: string) {
  const dialogRef = this.dialog.open(ModalRecusaComponent, {
    data: {
      idSelecionado: id,
      service: "agenda"
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    var token = localStorage.getItem("token");
    setTimeout(() => {
      this.dataSource = [];
      this.solicitacoesAgendamentoService.getSolicitacoesAgendamento(`${token}`).subscribe((res: any) => {
        this.dataSource = res;
      })
    }, 3000)
  });
}

aceitar(id: number) {
  var token = localStorage.getItem("token");
  this.router.navigate(['/', 'solicitacoes-lista-agendamento']);
  this.solicitacoesAgendamentoService.aceitaSolicitacaoAgendamento(`${token}`, id).subscribe((res) => {
    this.dialog.open(ModalSucessoComponent, {
      data: {
        titulo: "Sucesso",
        texto: "Agendamento Aceito com Sucesso!",
      }
    });
  });
  setTimeout(() => {
    this.dataSource = [];
    this.solicitacoesAgendamentoService.getSolicitacoesAgendamento(`${token}`).subscribe((res: any) => {
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
