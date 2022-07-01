import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AlfabetizandoService } from './manter-alfabetizando/alfabetizando.service';
import { ManterAlfabetizandoComponent } from './manter-alfabetizando/manter-alfabetizando.component';
import { Nivel1Component } from './nivel1/nivel1.component';
import { Nivel2Component } from './nivel2/nivel2.component';
import { Nivel3Component } from './nivel3/nivel3.component';

const rotas: Routes = [
  { path: 'manteralfabetizando', component: ManterAlfabetizandoComponent },
  { path: 'nivel1', component: Nivel1Component },
  { path: 'nivel2', component: Nivel2Component },
  { path: 'nivel3', component: Nivel3Component }
];

@NgModule({
  declarations: [
    AppComponent,
    ManterAlfabetizandoComponent,
    Nivel1Component,
    Nivel2Component,
    Nivel3Component
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    MessagesModule,
    MessageModule,
    RouterModule.forRoot(rotas)
  ],
  providers: [AlfabetizandoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
