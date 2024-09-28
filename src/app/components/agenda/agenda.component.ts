import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import prBrLocale from '@fullcalendar/core/locales/pt-br';
import { MenuItem } from 'primeng/api';
import { ModalComponent } from '../modal/modal.component';
import { AgendaService } from './services/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  public listaFormatada: any = [];

  public loading: boolean;

  public listaAgendamentos: any = [
    {title: 'Present', start: '2022-10-24T22:52:39.121',  color: '#FF0000'},
    {title: 'Present', start: '2022-10-24T22:52:39.121',  color: '#FF0000'},
    {title: 'Present', start: '2022-10-25T22:52:39.121',  color: '#FF0000'},
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: prBrLocale,
    events: this.listaFormatada,
    eventClick: this.openDialog.bind(this),
  };

  constructor(
    public agendaService: AgendaService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading = true;
    var token = localStorage.getItem("token");
    this.agendaService.getAgendamentos(`${token}`).subscribe((res: any) => {
      res.forEach((element) => {
        this.listaFormatada.push({
          title: ' - ' + element.atividade,
          start: element.dataHoraChegada,
          end: element.dataHoraSaida,
          color: '#FF0000',
          empresaCurso: element.empresaCurso,
          instituicaoCurso: element.instituicaoCurso,
          responsavel: element.responsavel,
          laboratorio: element.laboratorio.id,
          selecionado: element.id,
        });
      });
      this.loading = false;
    });
  }

  openDialog(a) {
    if (a === "item") {
      const dialogRef = this.dialog.open(ModalComponent,{
        data: {
          selecionado: null,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    } else {
      const dialogRef = this.dialog.open(ModalComponent,{
        data: {
          titulo: a.event.title,
          dataChegada: a.event.start,
          dataSaida: a.event.end,
          empresaCurso: a.event.extendedProps.empresaCurso,
          instituicaoCurso: a.event.extendedProps.instituicaoCurso,
          responsavel: a.event.extendedProps.responsavel,
          laboratorio: a.event.extendedProps.laboratorio,
          selecionado: a.event.extendedProps.selecionado,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }
}
