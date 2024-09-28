import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario-service/usuario.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit {

  public formularioNivelAcesso: FormGroup;

  foods: any[] = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'laboratorista', viewValue: 'Laboratorista'},
    {value: 'publico', viewValue: 'Público'}
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.formularioNivelAcesso = this.formBuilder.group({
      nivelAcesso: this.data.usuario,
    });
  }

  salvaNivelAcesso() {
    var token = localStorage.getItem("token");
    this.usuarioService.editarNivelUsuario(`${token}`, this.data.idSelecionado, this.formularioNivelAcesso.controls['nivelAcesso'].value).subscribe(data => {
      this.dialog.closeAll();
    });
  }
}

