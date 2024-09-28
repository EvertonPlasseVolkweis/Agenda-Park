import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalSucessoComponent } from '../modal-sucesso/modal-sucesso.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;
  public loading: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formularioLogin = this.formBuilder.group({
      email: [null],
      senha: [null]
    });
  }

  telaRegistrar() {
    this.router.navigate(['/', 'registrar']);
  }

  realizaLogin() {
    this.loading = true;
    this.loginService.realizaLogin(this.formularioLogin.value).subscribe(data => {
      localStorage.setItem("token", data.value.token);
      localStorage.setItem("usuario", JSON.stringify(data.value.usuario));
      localStorage.setItem("expiracao", data.value.expiracao);
      this.router.navigate(['']);
      this.openSucesso();
      this.loading = false;
    });
  }

  openSucesso() {
    this.dialog.open(ModalSucessoComponent, {
      data: {
        titulo: "Sucesso",
        texto: "Seu login foi efetuado com sucesso!",
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
