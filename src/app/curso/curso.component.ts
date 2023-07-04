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

  salvar()
  {
  
    //Se o ID do curso for undefined quer dizer que é um NOVO curso,ou seja,é para cadastrar!
    if(this.curso.idCurso == undefined)
    {
      this.cadastro();
    }else 
    {
      this.alterar();
    }
    //Se o curso tiver ID é porque ele foi selecionado! ou seja,podemos excluir ou alterar! Neste caso,ao
    //clicar em salvar,como faz a verificação do ID,se for diferent de UNDEFINED,ou seja,cai no else,vai
    //ser chamado o método de alterar!

  }

  cadastro(){
    //Listagem dos dados no console
    //console.log("Em curso.componente cadastro() " + "cursoNome: " + this.curso.nomeCurso + " valorCurso:" + this.curso.valorCurso )
          this.curso_service.cadastrarCurso(this.curso).subscribe(
            (res: Curso) => {
              //Limpar os atributos
              this.curso.nomeCurso = "";
              this.curso.valorCurso = 0;
      
              //Atualizar listagem de cursos
              this.selecao();
            } 
          );
  }

  alterar()
  {
   this.curso_service.alterarCurso(this.curso).subscribe(
    (res: Curso) => {
      this.curso.nomeCurso="";
      this.curso.valorCurso=0;
      this.selecao();
      alert("Curso de ID "+this.curso.idCurso+" alterado com sucesso!" )
    }
   );
  }

  remove3r(){ // alterei aqui
      this.curso_service.removerCurso(this.curso.idCurso).subscribe(
        resp => console.log('Deu certo',resp),
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
    console.log("Curso selecionado: ", this.curso.nomeCurso + "id: "+this.curso.idCurso)
  }


}
