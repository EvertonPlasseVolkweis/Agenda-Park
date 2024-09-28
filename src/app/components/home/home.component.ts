import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../agenda/services/agenda.service';
import { LaboratoriosService } from '../laboratorios/service/laboratorios.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public listaAgendaDoDia: any = [];
    public loading: boolean;
    public nomeLab: string;

    constructor(
        public agendaService: AgendaService,
        public laboratorioService: LaboratoriosService
    ) { }

    ngOnInit(): void {
        this.loading = true;
        var token = localStorage.getItem("token");
        this.agendaService.getAgendamentosDoDia(`${token}`).subscribe((res) => {
            res.forEach((element) => {
                this.nomeLab = element.laboratorio.nome;
            });
            this.listaAgendaDoDia = res;
            this.loading = false;
        });
    }
}
