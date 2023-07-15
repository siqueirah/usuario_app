import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-criarconta',
  templateUrl: './criarconta.component.html',
  styleUrls: ['./criarconta.component.css']
})
export class CriarcontaComponent {

  // Variáveis
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  // Construtor
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  // Criar um objeto para capturar os campos do formulário
  formCriarConta = new FormGroup({
    // Campo 'nome'
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(150)
    ]),
    // Campo 'email'
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    // Campo 'senha'
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+[\]{}|\\,.<>/?])[a-zA-Z0-9!@#$%^&*()\-=_+[\]{}|\\,.<>/?]{8,}$/)
    ])
  });

  // Função utilizada para exibir as mensagens de erro na página
  get form(): any {
    return this.formCriarConta.controls;
  }

  // Função para capturar o SUBMIT do formulário
  onSubmit(): void {
    this.spinner.show();

    // Limpar os valores das variáveis
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    // Fazendo uma requisição para POST /api/usuarios/criar-conta
    this.httpClient.post(
      environment.apiUsuarios + '/criar-conta',
      this.formCriarConta.value
    ).subscribe({
      next: (data: any) => { // Capturando o retorno de sucesso da API
        // Exibir mensagem de sucesso na página
        this.mensagem_sucesso = data.mensagem;
        // Limpar o conteúdo do formulário
        this.formCriarConta.reset();
      },
      error: (e) => { // Capturando o retorno de erro da API
        // Exibir mensagem de erro na página
        this.mensagem_erro = e.error.mensagem;
      }
    }).add(() => {
      this.spinner.hide();
    });
  }
}
