import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { ConsultaComponent } from '../app/pessoa/consulta/consulta.component';
import { CadastroComponent } from '../app/pessoa/cadastro/cadastro.component';
import { ContaCadastroComponent } from '../app/contas/conta-cadastro/conta-cadastro.component';
import { ContaConsultaComponent } from '../app/contas/conta-consulta/conta-consulta.component';
import { ContaMenuComponent } from '../app/contas/conta-menu/conta-menu.component';


const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'consulta-pessoa', component: ConsultaComponent },
    { path: 'cadastro-pessoa', component: CadastroComponent },
    { path: 'cadastro-pessoa/:codigo', component: CadastroComponent },
    { path: 'menu-conta', component: ContaMenuComponent },
    { path: 'cadastro-conta', component: ContaCadastroComponent },
    { path: 'consulta-conta', component: ContaConsultaComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);