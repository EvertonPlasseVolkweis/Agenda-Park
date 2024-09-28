import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgendaService } from '../agenda/services/agenda.service';
import { AgendamentoService } from '../agendamento/services/agendamento.service';
import { EquipamentoService } from '../equipamentos-crud/equipamentos/equipamento.service';
import { LaboratoriosService } from '../laboratorios/service/laboratorios.service';
import { ModalSucessoComponent } from '../modal-sucesso/modal-sucesso.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public formularioAgendamento!: FormGroup;
  public listaLaboratorios: any[];
  public dataInicioFormatada;
  public dataFimFormatada;
  public listaEquips: any = [];
  public listaEquipamentos: any = [];
  public loading: boolean;
  public disabled: boolean;
  public data1: Date;
  public data2: Date;
  public laboratorioSelecionado;
  public usuarioPublico: boolean;
  public disabledResponsavel: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public agendaService: AgendaService,
    public laboratoriosService: LaboratoriosService,
    private formBuilder: FormBuilder,
    public agendamentoService: AgendamentoService,
    private equipamentosService: EquipamentoService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const usuario = localStorage.getItem("usuario");
    const usuarioFormatado = JSON.parse(usuario);
    if (this.data.selecionado === null) {
      this.disabled = false;
    } else {
      if (usuarioFormatado.nivel_acesso === "publico") {
        this.usuarioPublico = true;
        this.disabled = true;
      }
    }
    this.loading = true;
    var token = localStorage.getItem("token");
    this.formularioAgendamento = this.formBuilder.group({
      dataHoraChegada: [{ value: '', disabled: this.disabled }, Validators.required],
      dataHoraSaida: [{ value: '', disabled: this.disabled }, Validators.required],
      atividade: [{ value: '', disabled: this.disabled }, Validators.required],
      empresaCurso: [{ value: '', disabled: this.disabled }, Validators.required],
      instituicaoCurso: [{ value: '', disabled: this.disabled }, Validators.required],
      idLaboratorio: [{ value: '', disabled: this.disabled }, Validators.required],
      responsavel: [{ value: '', disabled: this.disabledResponsavel }, Validators.required],
      observacao: [{ value: '', disabled: this.disabled }, Validators.required],
      idEquipamentos: [{ value: '', disabled: this.disabled }, Validators.required],
      aprovado: false,
      deletado: false
    });
    this.laboratoriosService.getLaboratoriosPorId(`${token}`, this.data.laboratorio).subscribe((res: any) => {
      this.laboratorioSelecionado = res.id;
    });
    this.equipamentosService.getEquipamento(`${token}`).subscribe((res: any) => {
      this.listaEquipamentos = res;
    });
    this.laboratoriosService.getLaboratorios(`${token}`).subscribe((res: any) => {
      this.listaLaboratorios = res;
    });
    if (this.data.selecionado === null) {
      this.disabledResponsavel = true;
      this.formularioAgendamento.controls['responsavel'].setValue(usuarioFormatado.nome);
      this.disabled = false;
      this.loading = false;
    } else {
      this.disabled = true;
      this.disabledResponsavel = true;
      this.agendamentoService.getAgendamentoPorId(`${token}`, this.data.selecionado).subscribe((res: any) => {
        this.data1 = new Date(res.dataHoraChegada);
        this.data2 = new Date(res.dataHoraSaida);
        this.formularioAgendamento.controls['atividade'].setValue(res.atividade);
        this.formularioAgendamento.controls['empresaCurso'].setValue(res.empresaCurso);
        this.formularioAgendamento.controls['instituicaoCurso'].setValue(res.instituicaoCurso);
        this.formularioAgendamento.controls['observacao'].setValue(res.observacao);
        this.formularioAgendamento.controls['responsavel'].setValue(res.responsavel);
        this.formularioAgendamento.controls['dataHoraChegada'].setValue(this.data1);
        this.formularioAgendamento.controls['dataHoraSaida'].setValue(this.data2);
        this.formularioAgendamento.controls['idLaboratorio'].setValue(res.laboratorioid);
        this.agendaService.getEquipamentosAgenda(`${token}`, this.data.selecionado).subscribe((res: any) => {
          res.forEach((element) => {
            this.listaEquips.push(element.equipamento.id);
          });
          this.loading = false;
        });
      });
    }
    if (usuarioFormatado.nivel_acesso === "publico") {
      this.formularioAgendamento.controls['atividade'].disable;
      this.formularioAgendamento.controls['empresaCurso'].disable;
      this.formularioAgendamento.controls['instituicaoCurso'].disable;
      this.formularioAgendamento.controls['observacao'].disable;
      this.formularioAgendamento.controls['responsavel'].disable;
      this.formularioAgendamento.controls['dataHoraChegada'].disable;
      this.formularioAgendamento.controls['dataHoraSaida'].disable;
      this.formularioAgendamento.controls['idLaboratorio'].disable;
      this.formularioAgendamento.controls['idEquipamentos'].disable;
    }
  }

  setIdPredio(id) {
  }

  public salvarAgendamento() {
    this.loading = true;
    if (this.formularioAgendamento.controls['atividade'].errors?.['required'],
      this.formularioAgendamento.controls['empresaCurso'].errors?.['required'],
      this.formularioAgendamento.controls['instituicaoCurso'].errors?.['required'],
      this.formularioAgendamento.controls['observacao'].errors?.['required'],
      this.formularioAgendamento.controls['responsavel'].errors?.['required'],
      this.formularioAgendamento.controls['dataHoraChegada'].errors?.['required'],
      this.formularioAgendamento.controls['dataHoraSaida'].errors?.['required'],
      this.formularioAgendamento.controls['idLaboratorio'].errors?.['required'],
      this.formularioAgendamento.controls['idEquipamentos'].errors?.['required']) {
      this.openModal("Erro", "Preencha todos os campos.");
    } else {
      var token = localStorage.getItem("token");
      if (this.data.selecionado === null) {
        this.agendamentoService.saveAgendamento(this.formularioAgendamento.value, `${token}`).subscribe(data => {
          this.loading = false;
          this.dialog.closeAll();
          this.openModal("Sucesso", "Solicitação de Agenda enviada com sucesso, aguarde ser revisada por um laboratorista.");
          this.router.navigate(['/', 'agenda']);
        });
      } else {
        this.agendamentoService.editaAgendamento(this.formularioAgendamento.value, `${token}`, this.data.selecionado).subscribe(data => {
          this.loading = false;
          this.openModal("Sucesso", "Agenda editada com sucesso.");
          this.router.navigate(['/', 'agenda']);
        });
      }
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

  telaTabelaAgendamento() {
    this.router.navigate(['/', 'agenda']);
  }
}
