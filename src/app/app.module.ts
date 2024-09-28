import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputMaskModule} from 'primeng/inputmask';
import {HttpClientModule} from '@angular/common/http';
import {PanelMenuModule} from 'primeng/panelmenu';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppComponent } from './app.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { AjudaComponent } from './components/ajuda/ajuda.component';
import { EquipamentosComponent } from './components/equipamentos-crud/equipamentos/equipamentos.component';
import { PredioComponent } from './components/predio/predio.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { EquipamentoListaComponent } from './components/equipamento-lista/equipamento-lista.component';
import {MatTableModule} from '@angular/material/table';
import { PredioListaComponent } from './components/predio-lista/predio-lista.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { AgendamentosComponent } from './components/agendamento/agendamento.component';
import { ListaSolicitacoesComponent } from './components/lista-solicitacoes/lista-solicitacoes.component';
import { LaboratoriosComponent } from './components/laboratorios/laboratorios.component';
import { LaboratoriosListaComponent } from './components/laboratorios-lista/laboratorios-lista.component';
import {DropdownModule} from 'primeng/dropdown';
import {MatSelectModule} from '@angular/material/select';
import { ListaSolicitacoesAgendamentoComponent } from './components/lista-solicitacoes-agendamento/lista-solicitacoes-agendamento.component';
import {CalendarModule} from 'primeng/calendar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { UsuariosListaComponent } from './components/usuarios-lista/usuarios-lista.component';
import { UsuariosCrudComponent } from './components/usuarios-crud/usuarios-crud.component';
import { ModalUsuarioComponent } from './components/modal-usuario/modal-usuario.component';
import { ModalSucessoComponent } from './components/modal-sucesso/modal-sucesso.component';
import { ModalAceitaComponent } from './components/modal-aceita/modal-aceita.component';
import { ModalRecusaComponent } from './components/modal-recusa/modal-recusa.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrarComponent,
    AgendaComponent,
    AjudaComponent,
    EquipamentosComponent,
    PredioComponent,
    EquipamentoListaComponent,
    PredioListaComponent,
    AgendamentosComponent,
    ListaSolicitacoesComponent,
    LaboratoriosComponent,
    LaboratoriosListaComponent,
    ListaSolicitacoesAgendamentoComponent,
    ModalComponent,
    UsuariosListaComponent,
    UsuariosCrudComponent,
    ModalUsuarioComponent,
    ModalSucessoComponent,
    ModalAceitaComponent,
    ModalRecusaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FlexLayoutModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule,
    HttpClientModule,
    PanelMenuModule,
    FullCalendarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    DropdownModule,
    MatSelectModule,
    CalendarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    CommonModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
