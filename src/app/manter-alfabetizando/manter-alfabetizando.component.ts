import { Component, OnInit } from '@angular/core';
import { AlfabetizandoService } from './alfabetizando.service';
import { Router } from '@angular/router';

import {Message, MessageService } from 'primeng/api';
import { MessagesModule } from "primeng/messages";

@Component({
  selector: 'app-manter-alfabetizando',
  templateUrl: './manter-alfabetizando.component.html',
  styleUrls: ['./manter-alfabetizando.component.css'],
  providers: [MessageService]
})
export class ManterAlfabetizandoComponent implements OnInit {

  alfabetizandos = ([] as any[]);
  tutores = ([] as any[]);
  clicou = false;
  id = 0;
  msgs!: Message[];

  constructor (
    private alfabetizandoService: AlfabetizandoService, 
    private router: Router,
    private messageService: MessageService
  ){}

  ngOnInit (){
    this.consultar();
    this.msgs = [];
  }

  consultar(){
    while(this.alfabetizandos.length){
      this.alfabetizandos.pop()
    }
    this.alfabetizandoService.consultarTutor().then(tutores => {
      this.tutores = tutores
      this.tutores.forEach( (value) => {
        value.idAlfabetizando.forEach( (valor: { idAlfabetizando: any; }) => {
          this.alfabetizandoService.consultar().then((alfabetizandos: any[]) => {
            alfabetizandos.forEach( (alfa: any) => {
              if(alfa.id == valor){
                this.alfabetizandos.push(alfa)
              }
            });
          })
          .catch(erro => {
            alert(erro);
          });
        }); 
      }); 
    });
  }

  adicionar(nome: string) {
    if(nome.length >= 3){
      this.alfabetizandoService.adicionar({ nome }).then(alfabetizando => {
        this.tutores.forEach( (value) => {
          value.idAlfabetizando.push(alfabetizando.id);
          this.alfabetizandoService.atualizarTutor(value);
          console.log("entrou");
          this.consultar();
          this.messageService.add({severity:'success', summary:`O alfabetizando ${alfabetizando.nome} foi adicionado com sucesso!`, detail:''});
        });
      })
      .catch(erro => {
        alert(erro);
      });
    } else {
      this.messageService.add({severity:'warn', summary:`Digite pelo menos 3 letras!`, detail:''});
    }
  }

  excluir(id: number) {
    this.alfabetizandoService.excluir(id).then(() => {
      this.tutores.forEach( (value) => {
        value.idAlfabetizando.splice(value.idAlfabetizando.indexOf(id), 1)
        this.alfabetizandoService.atualizarTutor(value)
        this.messageService.addAll([{severity:'success', summary:'O Alfabetizando foi excluído com sucesso', detail:''}]);
        this.consultar();
      });
    })
    .catch(erro => {
      alert(erro);
    });
  }

  atualizar(alfabetizando: any) {
    this.id = alfabetizando.id;
    console.log(alfabetizando);
    if(this.clicou) {
      this.alfabetizandoService.atualizar(alfabetizando).then(() => {
        this.messageService.addAll([{severity:'success', summary:'Alfabetizando foi alterado com sucesso', detail:''}]);
      })
      .catch(erro => {
        alert(erro);
      });
      this.clicou = false;
      this.id = 0;
    } else {
      this.clicou = true;
    }
  }

  verificarNivel(alfabetizando: any){
    this.alfabetizandos.forEach( (value) => {
      if(value.id == alfabetizando.id){
        if(value.nivel == 1){
          this.router.navigate(['/nivel1']);
        } else if(value.nivel == 2){
          this.router.navigate(['/nivel2']);
        } else if(value.nivel == 3){
          this.router.navigate(['/nivel3']);
        }
      }
    }); 
  }
}