import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario-service/usuario.service';
import { SolicitacoesAgendamentoService } from '../lista-solicitacoes-agendamento/service/solicitacoes-agendamento.service';
import { SolicitacoesService } from '../lista-solicitacoes/service/solicitacoes.service';
import { ModalSucessoComponent } from '../modal-sucesso/modal-sucesso.component';

@Component({
  selector: 'app-modal-recusa',
  templateUrl: './modal-recusa.component.html',
  styleUrls: ['./modal-recusa.component.css']
})
export class ModalRecusaComponent implements OnInit {

  public formularioMotivo: FormGroup;
  public loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private solicitacoesService: SolicitacoesService,
    private solicitacoesAgendamentoService: SolicitacoesAgendamentoService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.formularioMotivo = this.formBuilder.group({
      motivo: [null],
    });
  }

  salvaMotivo() {
    this.loading = true;
    var token = localStorage.getItem("token");
    if (this.data.service === "agenda") {
      this.solicitacoesAgendamentoService.recusaSolicitacaoAgendamento(`${token}`, this.data.idSelecionado, this.formularioMotivo.controls['motivo'].value).subscribe((res) => {
        this.loading = false;
        this.dialog.closeAll();
      });
    }
    if (this.data.service === "usuario") {
      this.solicitacoesService.recusaSolicitacao(`${token}`, this.data.idSelecionado, this.formularioMotivo.controls['motivo'].value).subscribe((res) => {
        this.loading = false;
        this.dialog.closeAll();
      });
    }
  }

  openModal(titulo, texto) {
    this.dialog.open(ModalSucessoComponent, {
      data: {
        titulo: titulo,
        texto: texto,
      }
    });
  }
}
