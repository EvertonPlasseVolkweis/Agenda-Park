import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AjudaService } from './services/ajuda.service';

@Component({
  selector: 'app-ajuda',
  templateUrl: './ajuda.component.html',
  styleUrls: ['./ajuda.component.css']
})
export class AjudaComponent implements OnInit {

  public formularioAjuda!: FormGroup;

  public listaInformacoes: any = [];

  constructor(
    public informacoesService: AjudaService,
  ) {
   }

  ngOnInit(): void {
    var token = localStorage.getItem("token");
    this.informacoesService.getInformacoes(`${token}`).subscribe((res: any) => {
      res.forEach((element) => {
        this.listaInformacoes.push({
          titulo: element.titulo,
          descricao: element.descricao,
        });
      });
    });
  }

  salvarAjuda() {
    
  }

}
