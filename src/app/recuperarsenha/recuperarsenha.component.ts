import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recuperarsenha',
  templateUrl: './recuperarsenha.component.html',
  styleUrls: ['./recuperarsenha.component.css']
})
export class RecuperarsenhaComponent {

  //variáveis
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  //método construtor
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){
  }

  //criando um objeto para capturar o formulário
  formRecuperarSenha = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  //função para acessar os campos do formulário na página
  //e então exibir mensagens de erro de validação
  get form(): any {
    return this.formRecuperarSenha.controls;
  }

  //função executada no momento do SUBMIT do formulário
  onSubmit(): void {    

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    this.spinner.show();
    //fazendo uma requisição POST para o serviço da API
    this.httpClient.post(
      environment.apiUsuarios + "/recuperar-senha",
      this.formRecuperarSenha.value
      ).subscribe({ //capturar a resposta da API
        next: (data: any) => { //recebendo o retorno de sucesso da API
          this.mensagem_sucesso = data.mensagem;
          this.formRecuperarSenha.reset(); //limpando o formulário
        },
        error: (e) => { //recebendo o retorno de erro da API
          this.mensagem_erro = e.error.mensagem;
        }
      }).add(() => {
        this.spinner.hide();
      });

  }
}
