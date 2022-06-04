import { environment } from './../../environments/environment.prod';
import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../model/UserLogin';


@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  userLogin: UserLogin = new UserLogin()
  
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe({
      next: (resp: UserLogin) => {
        this.userLogin = resp
        environment.nome = this.userLogin.nome;
        environment.id = this.userLogin.id;
        environment.usuario = this.userLogin.usuario;
        environment.foto = this.userLogin.foto;
        environment.token = this.userLogin.token;
        environment.tipo = this.userLogin.tipo;

        this.router.navigate(['/inicio'])
      },
      error: erro => {
        if (erro.status == 401) {
          alert('Usuario ou senha inválidos')
        }
      }
    })
  }
    
  }


