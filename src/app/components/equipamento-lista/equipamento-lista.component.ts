import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { EquipamentoService } from '../equipamentos-crud/equipamentos/equipamento.service';
import { ModalAceitaComponent } from '../modal-aceita/modal-aceita.component';

export interface PeriodicElement {
  nome: string;
  tipo: string;
  marca: string;
  modelo: string;
  patrimonio: string;
  localizacao: string;
  status: string;
}

@Component({
  selector: 'app-equipamento-lista',
  templateUrl: './equipamento-lista.component.html',
  styleUrls: ['./equipamento-lista.component.css']
})
export class EquipamentoListaComponent implements OnInit {


  displayedColumns: string[] = ['nome', 'tipo', 'marca', 'modelo', 'patrimonio', 'localizacao', 'status', 'editEmployee', 'deleteEmployee'];
  dataSource: any;
  public loading: boolean;

  constructor(
    public equipamentoService: EquipamentoService,
    public router: Router,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    var token = localStorage.getItem("token");
    this.equipamentoService.getEquipamento(`${token}`).subscribe((res: any) => {
      this.dataSource = res;
    })
  }

  telaCadastroEquipamento() {
    this.router.navigate(['/', 'equipamentos']);
  }

  deletar (id: number) {
    const dialogRef = this.dialog.open(ModalAceitaComponent, {
      data: {
        titulo: "Deseja Excluir o Equipamento?",
        id: id,
        service: "equipamento"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      var token = localStorage.getItem("token");
      setTimeout(() => {
        this.dataSource = [];
        this.equipamentoService.getEquipamento(`${token}`).subscribe((res: any) => {
          this.dataSource = res;
          this.loading = false;
        })
      }, 3000)
    });
  }

  editar(id) {
    localStorage.setItem("idSelecionado", id);
    this.router.navigate(['/', 'equipamentos']);
  }
  
  @ViewChild(MatTable) table: MatTable<PeriodicElement> | any;
}
