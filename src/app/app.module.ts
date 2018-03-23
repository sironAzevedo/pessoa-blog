import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './pessoa/menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ConsultaComponent } from './pessoa/consulta/consulta.component';
import { CadastroComponent } from './pessoa/cadastro/cadastro.component';
import { HttpModule } from '@angular/http';
import { routing } from '../app.routes/app.routs';
import { PessoaService } from './services/pessoa.service';
import { ConfigService } from './services/config.service';
import { SharedModule } from './shered/shared.module';
import {
  BrowserAnimationsModule, NoopAnimationsModule
} from '@angular/platform-browser/animations';
import { RlTagInputModule } from 'angular2-tag-input';
import { ContaCadastroComponent } from './contas/conta-cadastro/conta-cadastro.component';
import { ContaConsultaComponent } from './contas/conta-consulta/conta-consulta.component';
import { ContaMenuComponent } from './contas/conta-menu/conta-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    MenuComponent,
    HomeComponent,
    ConsultaComponent,
    CadastroComponent,
    ContaCadastroComponent,
    ContaConsultaComponent,
    ContaMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SharedModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RlTagInputModule
  ],
  providers: [ConfigService, PessoaService],
  bootstrap: [AppComponent],
  entryComponents: [ContaCadastroComponent]
})
export class AppModule { }
