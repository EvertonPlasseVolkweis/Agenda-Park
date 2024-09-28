import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EquipamentoService } from '../equipamentos-crud/equipamentos/equipamento.service';
import { LaboratoriosService } from '../laboratorios/service/laboratorios.service';
import { ModalSucessoComponent } from '../modal-sucesso/modal-sucesso.component';
import { PredioService } from '../predio-lista/predio.service';

@Component({
  selector: 'app-modal-aceita',
  templateUrl: './modal-aceita.component.html',
  styleUrls: ['./modal-aceita.component.css']
})
export class ModalAceitaComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public predioService: PredioService,
    public laboratoriosService: LaboratoriosService,
    public equipamentoService: EquipamentoService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  deletarItem() {
    var token = localStorage.getItem("token");
    if (this.data.service === "predio") {
      this.router.navigate(['/', 'predio-lista']);
      this.predioService.deletarPredio(`${token}`, this.data.id).subscribe((res: any) => {
        this.dialog.open(ModalSucessoComponent, {
          data: {
            titulo: "Sucesso",
            texto: "Prédio deletado com Sucesso!",
          }
        });
      });
    }
    if (this.data.service === "laboratorio") {
      this.router.navigate(['/', 'laboratorio-lista']);
      this.laboratoriosService.deletarLaboratorios(`${token}`, this.data.id).subscribe((res: any) => {
        this.dialog.open(ModalSucessoComponent, {
          data: {
            titulo: "Sucesso",
            texto: "Laboratório deletado com Sucesso!",
          }
        });
      })
    }
    if (this.data.service === "equipamento"){
      this.router.navigate(['/', 'equipamento-lista'])
      this.equipamentoService.deletarEquipamento(`${token}`, this.data.id).subscribe((res: any) => {
        this.dialog.open(ModalSucessoComponent, {
          data: {
            titulo: "Sucesso",
            texto: "Equipamento deletado com Sucesso!",
          }
        });
      })
    }
  }
}
