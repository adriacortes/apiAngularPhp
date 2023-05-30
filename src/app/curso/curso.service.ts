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
   

}

