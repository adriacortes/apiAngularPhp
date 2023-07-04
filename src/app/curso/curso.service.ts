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

  cadastrarCurso(curso:Curso):Observable<Curso>{
    return this.http.post<Curso>(this.url+'cadastrar',curso)
  }

  alterarCurso(curso:Curso):Observable<Curso>{
    return this.http.put<Curso>(this.url+'alterar',curso)
  }

  
  //Listagem de cursos
  obterCursos():Observable<Curso[]>{   
    return this.http.get(this.url+"listar")   
    .pipe( map((res:any) =>{    
       this.vetor = res; 
       return this.vetor;
      }))
    }  

  removerCurso(id: any): Observable<Curso> 
    {
      //Remover curso via ID(por parametro na url) ex.: http://localhost/php-pris/excluir?idCurso=3
      const url = `${this.url}excluir?idCurso=${id}`
      return this.http.delete<Curso>(url);
    }

   

}

