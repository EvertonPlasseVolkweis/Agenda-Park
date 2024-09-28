import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LaboratoriosService } from '../laboratorios/service/laboratorios.service';
import { ModalSucessoComponent } from '../modal-sucesso/modal-sucesso.component';
import { PredioService } from '../predio-lista/predio.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.css']
})
export class LaboratoriosComponent implements OnInit, OnDestroy {

  public formularioLaboratorio: FormGroup;


  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  listaPredio: any[];

  predioid: number;

  constructor(
    private formBuilder: FormBuilder,
    public laboratorioService: LaboratoriosService,
    public predioService: PredioService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formularioLaboratorio = this.formBuilder.group({
      nome: [null],
      sigla: [null],
      m2: [null],
      capacidade: [null],
      predioid: [null],
      localiza_dentro_Predio: [null],
    });
    var token = localStorage.getItem("token");
    this.predioService.getPredio(`${token}`).subscribe((res: any) => {
      this.listaPredio = res;
    });
    var idSelecionado = localStorage.getItem("idSelecionado");
    if (idSelecionado) {
      var token = localStorage.getItem("token");
      this.laboratorioService.getLaboratoriosPorId(`${token}`, idSelecionado).subscribe((res: any) => {
        this.formularioLaboratorio.controls['nome'].setValue(res.nome);
        this.formularioLaboratorio.controls['sigla'].setValue(res.sigla);
        this.formularioLaboratorio.controls['m2'].setValue(res.m2);
        this.formularioLaboratorio.controls['capacidade'].setValue(res.capacidade);
        this.formularioLaboratorio.controls['predioid'].setValue(res.predioid);
        this.formularioLaboratorio.controls['localiza_dentro_Predio'].setValue(res.localiza_dentro_Predio);
      });
    }
  }

  setIdPredio(id) {
    this.predioid = id;
  }

  telaTabelaLaboratorios() {
    this.router.navigate(['/', 'laboratorios-lista']);
  }

  public salvarLaboratorio() {
    var token = localStorage.getItem("token");
    var idSelecionado = localStorage.getItem("idSelecionado");
    if (idSelecionado) {
      this.laboratorioService.editaLaboratorio(this.formularioLaboratorio.value, `${token}`, idSelecionado).subscribe(data => {
        this.dialog.open(ModalSucessoComponent, {
          data: {
            titulo: "Sucesso",
            texto: "Laboratório editado com Sucesso!",
          }
        });
        this.router.navigate(['/', 'laboratorios-lista']);
      });
    } else {
      this.laboratorioService.saveLaboratorios(this.formularioLaboratorio.value, `${token}`).subscribe(data => {
        this.dialog.open(ModalSucessoComponent, {
          data: {
            titulo: "Sucesso",
            texto: "Laboratório cadastrado com Sucesso!",
          }
        });
        this.router.navigate(['/', 'laboratorios-lista']);
      });
    }

  }

  ngOnDestroy(): void {
    localStorage.removeItem("idSelecionado");
  }
}
