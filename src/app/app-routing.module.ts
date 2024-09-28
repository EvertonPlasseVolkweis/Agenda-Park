import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgendaComponent } from "./components/agenda/agenda.component";
import { AgendamentosComponent } from "./components/agendamento/agendamento.component";
import { AjudaComponent } from "./components/ajuda/ajuda.component";
import { EquipamentoListaComponent } from "./components/equipamento-lista/equipamento-lista.component";
import { EquipamentosComponent } from "./components/equipamentos-crud/equipamentos/equipamentos.component";
import { HomeComponent } from "./components/home/home.component";
import { LaboratoriosListaComponent } from "./components/laboratorios-lista/laboratorios-lista.component";
import { LaboratoriosComponent } from "./components/laboratorios/laboratorios.component";
import { ListaSolicitacoesAgendamentoComponent } from "./components/lista-solicitacoes-agendamento/lista-solicitacoes-agendamento.component";
import { ListaSolicitacoesComponent } from "./components/lista-solicitacoes/lista-solicitacoes.component";
import { LoginComponent } from "./components/login/login.component"; 
import { PredioListaComponent } from "./components/predio-lista/predio-lista.component";
import { PredioComponent } from "./components/predio/predio.component";
import { RegistrarComponent } from "./components/registrar/registrar.component";
import { UsuariosCrudComponent } from "./components/usuarios-crud/usuarios-crud.component";
import { UsuariosListaComponent } from "./components/usuarios-lista/usuarios-lista.component";
import { AutorizadoGuard } from "./components/_guard/autorizado.guard";
import { AdminGuard } from "./components/_guardadmin/admin.guard";
import { LaboratoristaGuard } from "./components/_guardlaboratorista/laboratorista.guard";
import { PublicoGuard } from "./components/_guardpublico/publico.guard";

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AutorizadoGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'equipamentos', component: EquipamentosComponent, canActivate: [AutorizadoGuard, LaboratoristaGuard]},
    {path: 'ajuda', component: AjudaComponent, canActivate: [AutorizadoGuard]},
    {path: 'registrar', component: RegistrarComponent},
    {path: 'agenda', component: AgendaComponent, canActivate: [AutorizadoGuard]},
    {path: 'predio', component: PredioComponent, canActivate: [AutorizadoGuard, LaboratoristaGuard]},
    {path: 'equipamento-lista', component: EquipamentoListaComponent, canActivate: [AutorizadoGuard, LaboratoristaGuard]},
    {path: 'predio-lista', component: PredioListaComponent, canActivate: [AutorizadoGuard, LaboratoristaGuard]},
    {path: 'lista-solicitacoes', component: ListaSolicitacoesComponent, canActivate: [AutorizadoGuard, LaboratoristaGuard]},
    {path: 'laboratorios', component: LaboratoriosComponent, canActivate: [AutorizadoGuard, LaboratoristaGuard]},
    {path: 'laboratorios-lista', component: LaboratoriosListaComponent, canActivate: [AutorizadoGuard, LaboratoristaGuard]},
    {path: 'lista-solicitacoes-agendamento', component: ListaSolicitacoesAgendamentoComponent, canActivate: [AutorizadoGuard, LaboratoristaGuard]},
    {path: 'usuario-lista', component: UsuariosListaComponent, canActivate: [AutorizadoGuard, AdminGuard]},
    {path: 'usuario', component: UsuariosCrudComponent, canActivate: [AutorizadoGuard, LaboratoristaGuard]},
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}