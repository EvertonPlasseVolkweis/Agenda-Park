import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { LaboratoriosService } from '../laboratorios/service/laboratorios.service';
import { ModalAceitaComponent } from '../modal-aceita/modal-aceita.component';

export interface PeriodicElement {
  nome: string;
  endereco: string;
}

@Component({
  selector: 'app-laboratorios-lista',
  templateUrl: './laboratorios-lista.component.html',
  styleUrls: ['./laboratorios-lista.component.css']
})
export class LaboratoriosListaComponent implements OnInit {


  displayedColumns: string[] = ['nome', 'endereco', 'm2', 'capacidade', 'localizacao', 'editEmployee', 'deleteEmployee'];
  dataSource: any;
  public loading: boolean;

  constructor(
    private router: Router,
    private laboratoriosService: LaboratoriosService,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    var token = localStorage.getItem("token");
    this.laboratoriosService.getLaboratorios(`${token}`).subscribe((res: any) => {
      this.dataSource = res;
    });
  }

  telaCadastroLaboratorio() {
    this.router.navigate(['/', 'laboratorios']);
  }

  deletar (id: number) {
    const dialogRef = this.dialog.open(ModalAceitaComponent, {
      data: {
        titulo: "Deseja Excluir o Laboratório?",
        id: id,
        service: "laboratorio"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      var token = localStorage.getItem("token");
      setTimeout(() => {
        this.dataSource = [];
        this.laboratoriosService.getLaboratorios(`${token}`).subscribe((res: any) => {
          this.dataSource = res;
          this.loading = false;
        })
      }, 3000)
    });
  }

  editar(id) {
    localStorage.setItem("idSelecionado", id);
    this.router.navigate(['/', 'laboratorios']);
  }
  
  @ViewChild(MatTable) table: MatTable<PeriodicElement> | any;
}
