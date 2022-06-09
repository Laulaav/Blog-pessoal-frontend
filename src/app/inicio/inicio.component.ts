import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTemas: Tema[]

  idTema: number
  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      alert("Sua seção expirou")
      this.router.navigate(["/entrar"])
    }
    
    this.authService.refreshToken()
    this.getAllTemas()
    this.getAllPostagens()
   
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe({
      next: (res: Tema[]) => {
        this.listaTemas = res;
      },
      error: err => console.log(err)
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe({
      next: (res: Tema) => {
        console.log(res)
        this.tema = res;
      }
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe({
      next: (res: Postagem[]) => {
        this.listaPostagens = res;
      },
      error: err => console.log(err)
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe({
      next: (res: User) => {

        this.user = res;
      },
      error: err => console.log(err)
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}
