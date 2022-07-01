import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlfabetizandoService {

  url = 'http://localhost:3000/alfabetizando'; // api fake
  urlTutor = 'http://localhost:3000/tutor';

  constructor(private http: HttpClient) { }

  consultarTutor(): Promise<any> {
    return this.http.get(this.urlTutor).toPromise().catch(erro => {
      return Promise.reject(`Erro ao consultar alfabetizandos.`);
    });
  }

  consultar(): Promise<any> {
    return this.http.get(this.url).toPromise().catch(erro => {
      return Promise.reject(`Erro ao consultar alfabetizandos.`);
    });
  }

  adicionar(alfabetizando: any): Promise<any>{
    this.addPropriedadesAlfabetizando(alfabetizando);
    return this.http.post(this.url, alfabetizando).toPromise().catch(erro => {
      return Promise.reject(`Erro ao adicionar alfabetizando ${alfabetizando.nome}.`)
    });
  }

  excluir(id: number): Promise<any>{
    return this.http.delete(this.url+'/'+id).toPromise().catch(erro => {
      return Promise.reject(`Erro ao excluir alfabetizando com id ${id}.`)
    });
  }

  atualizar(alfabetizando: any): Promise<any>{
    this.addPropriedadesAlfabetizando(alfabetizando);
    return this.http.put(this.url+'/'+alfabetizando.id, alfabetizando).toPromise().catch(erro => {
      return Promise.reject(`Erro ao atualizar alfabetizando com id ${alfabetizando.id}.`)
    });
  }

  atualizarTutor(tutor: any): Promise<any>{
    return this.http.put(this.urlTutor+'/'+tutor.id, tutor).toPromise().catch(erro => {
      return Promise.reject(`Erro ao atualizar alfabetizando com id ${tutor.id}.`)
    });
  }

  addPropriedadesAlfabetizando(alfabetizando: any) {
    Object.defineProperty(alfabetizando, 'nivel', {value: 1, enumerable: true});
    Object.defineProperty(alfabetizando, 'atividade', {value: "inicio 1", enumerable: true});
  }
}
