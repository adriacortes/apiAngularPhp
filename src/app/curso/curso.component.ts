import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //URL Base
  url = "http://localhost/api/php/";

  //Vetor de Cursos
  vetor: Curso[];

  //Objeto da Classe Curso
  curso = new Curso();

  
  //Construtor
  constructor(
    //private http: HttpClient,
    private curso_service: CursoService
    ){}


  //Inicializador
  ngOnInit(){
    //Ao inicializar o sistema, deverá listar os cursos
    this.selecao();
  }

  //Selecionar
  selecao(){
    console.log('call selecao component');
    this.curso_service.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    )
  }


  //Cadastrar
  cadastro(){
    console.log("Em curso.componente cadastro() " + "cursoNome: " + this.curso.nomeCurso + " valorCurso:" + this.curso.valorCurso )
    
    this.curso_service.cadastrarCurso(this.curso).subscribe(
      (res: Curso) => {

        //Adicionando dados ao vetor
        //this.vetor = res;

        //Limpar os atributos
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

        //Atualizar listagem de cursos
        this.selecao();
      } 
    );
  }




  
  //Alterar
  alterar(): void{
    alert("Alterar");
  }


    //Remover - CAPGEMINI
    remove3r(){ // alterei aqui
      this.curso_service.removerCurso(this.curso.idCurso).subscribe(
        resp => console.log('Deu certo, resp'),
        err => console.log('Deu erro', err)
        
      );
      this.selecao();//atualiza a tabela
      this.curso.nomeCurso = "";
      this.curso.valorCurso = 0;
    }

     

  //Remover
  remover(){//aqui
    this.curso_service.removerCurso(this.curso.idCurso).subscribe(
      (res : Curso) => {
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;
        this.selecao();

      }
    );
  }
  

  //Selecionar um curso especifico na tabela
  selecionarCurso(c: Curso){
    this.curso.idCurso = c.idCurso; 
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }


}
