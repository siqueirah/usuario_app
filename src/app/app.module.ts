import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AutenticarComponent } from './autenticar/autenticar.component';
import { CriarcontaComponent } from './criarconta/criarconta.component';
import { RecuperarsenhaComponent } from './recuperarsenha/recuperarsenha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//mapeamento das rotas do projeto
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/acessar-conta' },
  { path: 'home/acessar-conta', component: AutenticarComponent },
  { path: 'home/criar-conta', component: CriarcontaComponent },
  { path: 'home/recuperar-senha', component: RecuperarsenhaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AutenticarComponent,
    CriarcontaComponent,
    RecuperarsenhaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //formulários reativos
    ReactiveFormsModule, //formulários reativos
    HttpClientModule, //biblioteca para requisições HTTP
    RouterModule.forRoot(routes) //registrando as rotas do projeto
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
