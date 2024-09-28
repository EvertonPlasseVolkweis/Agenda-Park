import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agenda-park';
  items: MenuItem[];

  public location = window.location;

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  public selecionadoAgenda = false;
  public selecionadoAgendamento = false;
  public selecionadoAjuda = false;
  public selecionadoEquipamento = false;
  public selecionadoPredio = false;
  public selecionadoLab = false;
  public selecionadoSolicitacoesUsuario = false;
  public selecionadoSolicitacoesAgenda = false;
  public selecionadoUsuarios = false;
  public usuarioAdmin: boolean;
  public usuarioLaboratorista: boolean;
  public usuarioPublico: boolean;

  constructor(
    private router: Router
  ) { }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  ngOnInit(): void {
    const exper = Date.parse(localStorage.getItem("expiracao"));
    if (Date.now() > exper) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiracao");
      localStorage.removeItem("usuario");
    }
    const usuario = localStorage.getItem("usuario");
    const usuarioFormatado = JSON.parse(usuario);
    if (usuarioFormatado.nivel_acesso === "admin") {
      this.usuarioAdmin = true;
    }
    if (usuarioFormatado.nivel_acesso === "publico") {
      this.usuarioPublico = true;
    }
    if (usuarioFormatado.nivel_acesso === "laboratorista") {
      this.usuarioLaboratorista = true;
    }
    this.location.href.endsWith
    this.items = [
      {
        label: 'Menu',
        icon: 'pi pi-fw pi-list',
        items: [
          { label: 'Agenda', icon: 'pi pi-fw pi-calendar', command: (event) => { this.clickItem1(); }},
          { label: 'Agendamento', icon: 'pi pi-fw pi-calendar', command: (event) => { this.clickItem2(); }},
          { label: 'Ajuda', icon: 'pi pi-fw pi-question-circle', command: (event) => { this.clickItem3(); }},
          { label: 'Equipamento', icon: 'pi pi-fw pi-inbox',  command: (event) => { this.clickItem4();  }},
          { label: 'Prédio', icon: 'pi pi-fw pi-building',  command: (event) => { this.clickItem5();  }},
          { label: 'Laboratório', icon: 'pi pi-fw pi-building',  command: (event) => { this.clickItem6();  }},
          { label: 'Solicitações', icon: 'pi pi-user-plus',  command: (event) => { this.clickItem7();  }},
          { label: 'Solicitações de Agendamento', icon: 'pi pi-user-plus',  command: (event) => { this.clickItem8();  }},
          { label: 'Usuários', icon: 'pi pi-user-plus',  command: (event) => { this.clickItem9();  }}
        ]
      },
    ];
  }

  clickItem1() {
    this.selecionadoAgenda = true;
    this.selecionadoAgendamento = false;
    this.selecionadoAjuda = false;
    this.selecionadoEquipamento = false;
    this.selecionadoPredio = false;
    this.selecionadoLab = false;
    this.selecionadoSolicitacoesUsuario = false;
    this.selecionadoSolicitacoesAgenda = false;
    this.selecionadoUsuarios = false;
    this.router.navigate(['/', 'agenda']);
  }

  clickItem2() {
    this.selecionadoAgendamento = true;
    this.selecionadoAgenda = false;
    this.selecionadoAjuda = false;
    this.selecionadoEquipamento = false;
    this.selecionadoPredio = false;
    this.selecionadoLab = false;
    this.selecionadoSolicitacoesUsuario = false;
    this.selecionadoSolicitacoesAgenda = false;
    this.selecionadoUsuarios = false;
    this.router.navigate(['/', 'agendamento']);
  }

  clickItem3() {
    this.selecionadoAjuda = true;
    this.selecionadoAgendamento = false;
    this.selecionadoAgenda = false;
    this.selecionadoEquipamento = false;
    this.selecionadoPredio = false;
    this.selecionadoLab = false;
    this.selecionadoSolicitacoesUsuario = false;
    this.selecionadoSolicitacoesAgenda = false;
    this.selecionadoUsuarios = false;
    this.router.navigate(['/', 'ajuda']);
  }

  clickItem4() {
    this.selecionadoEquipamento = true;
    this.selecionadoAgendamento = false;
    this.selecionadoAjuda = false;
    this.selecionadoAgenda = false;
    this.selecionadoPredio = false;
    this.selecionadoLab = false;
    this.selecionadoSolicitacoesUsuario = false;
    this.selecionadoSolicitacoesAgenda = false;
    this.selecionadoUsuarios = false;
    this.router.navigate(['/', 'equipamento-lista']);
  }

  clickItem5() {
    this.selecionadoPredio = true;
    this.selecionadoAgendamento = false;
    this.selecionadoAjuda = false;
    this.selecionadoEquipamento = false;
    this.selecionadoAgenda = false;
    this.selecionadoLab = false;
    this.selecionadoSolicitacoesUsuario = false;
    this.selecionadoSolicitacoesAgenda = false;
    this.selecionadoUsuarios = false;
    this.router.navigate(['/', 'predio-lista']);
  }

  clickItem6() {
    this.selecionadoLab = true;
    this.selecionadoAgendamento = false;
    this.selecionadoAjuda = false;
    this.selecionadoEquipamento = false;
    this.selecionadoAgenda = false;
    this.selecionadoSolicitacoesUsuario = false;
    this.selecionadoSolicitacoesAgenda = false;
    this.selecionadoUsuarios = false;
    this.selecionadoPredio = false;
    this.router.navigate(['/', 'laboratorios-lista']);
  }

  clickItem7() {
    this.selecionadoSolicitacoesUsuario = true;
    this.selecionadoAgendamento = false;
    this.selecionadoAjuda = false;
    this.selecionadoEquipamento = false;
    this.selecionadoAgenda = false;
    this.selecionadoSolicitacoesAgenda = false;
    this.selecionadoUsuarios = false;
    this.selecionadoPredio = false;
    this.selecionadoLab = false;
    this.router.navigate(['/', 'lista-solicitacoes']);
  }

  clickItem8() {
    this.selecionadoSolicitacoesAgenda = true;
    this.selecionadoAgendamento = false;
    this.selecionadoAjuda = false;
    this.selecionadoEquipamento = false;
    this.selecionadoAgenda = false;
    this.selecionadoPredio = false;
    this.selecionadoSolicitacoesUsuario = false;
    this.selecionadoLab = false;
    this.selecionadoUsuarios = false;
    this.router.navigate(['/', 'lista-solicitacoes-agendamento']);
  }

  clickItem9() {
    this.selecionadoUsuarios = true;
    this.selecionadoLab = false;
    this.selecionadoAgendamento = false;
    this.selecionadoAjuda = false;
    this.selecionadoEquipamento = false;
    this.selecionadoAgenda = false;
    this.selecionadoPredio = false;
    this.selecionadoSolicitacoesUsuario = false;
    this.selecionadoSolicitacoesAgenda = false;
    this.router.navigate(['/', 'usuario-lista']);
  }

  navegar() {
    this.router.navigate(['']);
  }
}
