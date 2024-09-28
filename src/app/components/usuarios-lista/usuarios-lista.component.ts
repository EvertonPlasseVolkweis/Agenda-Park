import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario-service/usuario.service';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';

export interface PeriodicElement {
nome: string;
endereco: string;
}

@Component({
selector: 'app-usuarios-lista',
templateUrl: './usuarios-lista.component.html',
styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnInit {


displayedColumns: string[] = ['nome', 'endereco', 'editEmployee'];
dataSource: any;

constructor(
  private router: Router,
  private usuarioService: UsuarioService,
  public dialog: MatDialog,
  ) {}

ngOnInit(): void {
  var token = localStorage.getItem("token");
  this.usuarioService.getUsuarios(`${token}`).subscribe((res: any) => {
    this.dataSource = res;
  });
}

openDialog(a) {
  console.log(a);
  const dialogRef = this.dialog.open(ModalUsuarioComponent,{
    data: {
      idSelecionado: a.id,
      usuario: a.nivel_acesso,
    }
  });
  dialogRef.afterClosed().subscribe(result => {
  });
}

@ViewChild(MatTable) table: MatTable<PeriodicElement> | any;
}
