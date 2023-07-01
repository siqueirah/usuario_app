import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-criarconta',
  templateUrl: './criarconta.component.html',
  styleUrls: ['./criarconta.component.css']
})
export class CriarcontaComponent {

  //variáveis
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  //construtor
  constructor(
    private httpClient: HttpClient
  ) {
  }

  //criar um objeto para capturar os campos do formulário
  formCriarConta = new FormGroup({
    //campo 'nome'
    nome: new FormControl('',
      [Validators.required, Validators.minLength(8), Validators.maxLength(150)]),
    //campo 'email'
    email: new FormControl('',
      [Validators.required, Validators.email]),
    //campo 'senha'
    senha: new FormControl('',
      [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+[\]{}|\\,.<>/?])[a-zA-Z0-9!@#$%^&*()\-=_+[\]{}|\\,.<>/?]{8,}$/)])
  });

  //função utilizada para exibir as mensagens de erro na página
  get form(): any {
    return this.formCriarConta.controls;
  }

  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    //limpar os valores das variáveis
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    //fazendo uma requisição para POST /api/usuarios/criar-conta
    this.httpClient.post(
      environment.apiUsuarios + '/criar-conta',
      this.formCriarConta.value
    )
      .subscribe({
        next: (data: any) => { //capturando o retorno de sucesso da API
          //exibir mensagem de sucesso na página
          this.mensagem_sucesso = data.mensagem;
          //limpar o conteúdo do formulário
          this.formCriarConta.reset();
        },
        error: (e) => { //capturando o retorno de erro da API
          //exibir mensagem de erro na página
          this.mensagem_erro = e.error.mensagem;
        }
      })
  }

}
