import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipamentoService } from '../equipamentos-crud/equipamentos/equipamento.service';
import { LaboratoriosService } from '../laboratorios/service/laboratorios.service';
import { AgendamentoService } from './services/agendamento.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentosComponent implements OnInit, OnDestroy {

  public formularioAgendamento!: FormGroup;

  listaLaboratorios: any[];

  listaEquipamentos: any[];

  public loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public agendamentoService: AgendamentoService,
    public laboratoriosService: LaboratoriosService,
    public equipamentosService: EquipamentoService,
    public router: Router
  ) { }


  ngOnInit(): void {
    this.loading = true;
    var token = localStorage.getItem("token");
    this.formularioAgendamento = this.formBuilder.group({
      dataHoraChegada: [null],
      dataHoraSaida: [null],
      atividade: [null],
      empresaCurso: [null],
      instituicaoCurso: [null],
      idLaboratorio: [null],
      responsavel: [null],
      observacao: [null],
      idEquipamentos: [null],
      aprovado: false,
      deletado: false
    });
    this.laboratoriosService.getLaboratorios(`${token}`).subscribe((res: any) => {
      this.listaLaboratorios = res;
    });
    this.equipamentosService.getEquipamento(`${token}`).subscribe((res: any) => {
      this.listaEquipamentos = res;
    });
    var idSelecionado = localStorage.getItem("idSelecionado");
    if (idSelecionado) {
      this.agendamentoService.getAgendamentoPorId(`${token}`, idSelecionado).subscribe((res: any) => {
        this.formularioAgendamento.controls['nome'].setValue(res.nome);
        this.formularioAgendamento.controls['tipo'].setValue(res.tipo);
        this.formularioAgendamento.controls['marca'].setValue(res.marca);
        this.formularioAgendamento.controls['modelo'].setValue(res.modelo);
        this.formularioAgendamento.controls['patrimonio'].setValue(res.patrimonio);
        this.formularioAgendamento.controls['localizacao'].setValue(res.localizacao);
        this.formularioAgendamento.controls['status'].setValue(res.status);
      });
    }
    this.loading = false;
  }

  setIdPredio(id) {
  }

  public salvarAgendamento() {
    var token = localStorage.getItem("token");
    var idSelecionado = localStorage.getItem("idSelecionado");
    if (idSelecionado) {
      this.agendamentoService.editaAgendamento(this.formularioAgendamento.value, `${token}`, idSelecionado).subscribe(data => {
        this.router.navigate(['/', 'agenda']);
      });
    } else {
      this.agendamentoService.saveAgendamento(this.formularioAgendamento.value, `${token}`).subscribe(data => {
        this.router.navigate(['/', 'agenda']);
      });
    }
  } 

  telaTabelaAgendamento() {
    this.router.navigate(['/', 'agenda']);
  }

  ngOnDestroy(): void {
    localStorage.removeItem("idSelecionado");
  }

}
