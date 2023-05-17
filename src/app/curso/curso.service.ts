import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Curso } from './curso';
import { RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class CursoService {

  //URL 
  url = "http://localhost/php-pris/";

  //Vetor
  vetor: Curso[];

   //Construtor
  constructor(private http: HttpClient) { }

 //FACILITADOR CAP
  obterCursos():Observable<Curso[]>{   
    return this.http.get(this.url+"listar")   
    .pipe( map((res:any) =>{    
       this.vetor = res; // remover o res['curso']
       debugger
       return this.vetor;
      }))
    }  

  
  //Cadastrar curso
  /*cadastrarCurso(c: Curso): Observable<Curso[]>{
    console.log("Em curso.service.ts cadastrarCurso: " + c);
    console.log(c);

    
    return this.http.post(this.url+"cadastrar", {cursos: c})
    .pipe( map((res:any) => {

      console.log('push: ' + res);        //modificado para teste

      this.vetor.push(res);
      return this.vetor;
    }))
  }*/

  cadastrarCurso(curso:Curso):Observable<Curso>{
    return this.http.post<Curso>(this.url+'cadastrar',curso)
    }

    removerCurso(id: any): Observable<Curso> 
    {
      //id do curso via url ex.: http://localhost/php-pris/excluir?idCurso=3
      const url = `${this.url}excluir?idCurso=${id}`
      console.log(url);
      return this.http.delete<Curso>(url);
    }
   

//Remover curso CAPGGEMINI 
removerCurso2(c: Curso): Observable<Curso[]>{

  const params = new HttpParams().set("idCurso", c.idCurso.toString());

  return this.http.delete(this.url + 'excluir', {params: params})
  .pipe(map((res: any) =>  {
    const filtro = this.vetor.filter((curso) => {
      return +curso['idCurso'] != +c.idCurso;
    });

    return this.vetor = filtro;
  }))
}


/*
//Remover Curso - modificado
removerCurso(c: Curso): Observable<Curso[]>{

  const params = new HttpParams().set("idCurso", c?.idCurso?.toString() ?? 'nothing');

    return this.http.delete(this.url + 'excluir', {params: params})
    .pipe(map((res) =>  {
      const filtro = this.vetor.filter((curso) => {
        const auxIdCurso = c?.idCurso ?? '-1';
        const auxCurso = curso['idCurso'] ?? '-1';
        return +auxCurso != +auxIdCurso;
      });

    return this.vetor = filtro;

  }))
}
*/



}

