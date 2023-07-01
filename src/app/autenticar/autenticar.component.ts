import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.component.html',
  styleUrls: ['./autenticar.component.css']
})
export class AutenticarComponent {

  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  //construtor
  constructor(
    private httpClient: HttpClient
  ) { }

  //criando o objeto para capturar o formulário
  formAutenticar = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+[\]{}|\\,.<>/?])[a-zA-Z0-9!@#$%^&*()\-=_+[\]{}|\\,.<>/?]{8,}$/)])
  });

  //função para acessar os campos do formulário
  //na página e exibir as mensagens de erro de validação
  get form(): any {
    return this.formAutenticar.controls;
  }

  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    //limpar o valor das variáveis
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
    
    //fazendo uma requisição POST para o serviço de autenticação
    //da API de usuários /POST /api/usuarios/autenticar
    this.httpClient.post(
      environment.apiUsuarios + '/autenticar', 
      this.formAutenticar.value)
      .subscribe({ //capturar o retorno/resposta da API
        next: (data : any) => { //resposta de sucesso!
          this.mensagem_sucesso = data.mensagem;
          //gravar os dados obtidos na local storage
          localStorage.setItem('auth_usuario', JSON.stringify(data));
        },
        error: (e) => { //resposta de erro!
          this.mensagem_erro = e.error.mensagem;
        }
      })
  }
}
