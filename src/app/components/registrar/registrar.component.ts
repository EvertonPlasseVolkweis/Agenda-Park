import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailService } from 'src/app/email-service/email.service';
import { ModalSucessoComponent } from '../modal-sucesso/modal-sucesso.component';
import { RegistrarService } from './services/registrar.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  formularioRegistrar!: FormGroup;
  public loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private registrarService: RegistrarService,
    private emailService: EmailService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formularioRegistrar = this.formBuilder.group({
      nome: [null],
      email: [null],
      senha: [null],
      telefone: [null],
      nivel_acesso: 'publico',
      aprovado: false,
      deletado: false,
    });
  }

  registraUsuario() {
    this.loading = true;
    this.registrarService.registarUser(this.formularioRegistrar.value).subscribe(data => {
      this.loading = false;
      this.openSucesso();
    });
  }

  openSucesso() {
    this.dialog.open(ModalSucessoComponent, {
      data: {
        titulo: "Sucesso",
        texto: "Seu Cadastro foi efetuado com sucesso, aguarde ser revisado por um laboratorista.",
      }
    });
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
