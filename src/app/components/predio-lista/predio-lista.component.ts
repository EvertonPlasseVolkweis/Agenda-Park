import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalAceitaComponent } from '../modal-aceita/modal-aceita.component';
import { PredioService } from './predio.service';

export interface PeriodicElement {
  nome: string;
  endereco: string;
}

@Component({
  selector: 'app-predio-lista',
  templateUrl: './predio-lista.component.html',
  styleUrls: ['./predio-lista.component.css']
})
export class PredioListaComponent implements OnInit {


  displayedColumns: string[] = ['nome', 'endereco', 'editEmployee', 'deleteEmployee'];
  dataSource: any;
  public loading: boolean;

  constructor(
    public predioService: PredioService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    var token = localStorage.getItem("token");
    this.predioService.getPredio(`${token}`).subscribe((res: any) => {
      this.dataSource = res;
    });
  }

  telaCadastroPredio() {
    this.router.navigate(['/', 'predio']);
  }

  deletar(id: number) {
    const dialogRef = this.dialog.open(ModalAceitaComponent, {
      data: {
        titulo: "Deseja Excluir o Prédio?",
        id: id,
        service: "predio"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      var token = localStorage.getItem("token");
      setTimeout(() => {
        this.dataSource = [];
        this.predioService.getPredio(`${token}`).subscribe((res: any) => {
          this.dataSource = res;
          this.loading = false;
        })
      }, 3000)
    });
  }

  editar(id) {
    localStorage.setItem("idSelecionado", id);
    this.router.navigate(['/', 'predio']);
  }

  @ViewChild(MatTable) table: MatTable<PeriodicElement> | any;
}
