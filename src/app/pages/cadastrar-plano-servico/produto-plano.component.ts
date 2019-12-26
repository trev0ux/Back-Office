import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoClubService } from 'src/app/services/produto.service.club';

@Component({
  selector: 'app-produto-plano',
  templateUrl: './produto-plano.component.html',
  styleUrls: ['./produto-plano.component.css']
})
export class ProdutoPlanoComponent implements OnInit {

  public products: any[];
  public produtoModel: Produto = {};

  constructor( private router: Router,
               private produtoService: ProdutoClubService) { }

  ngOnInit() {
    this.products = [];
    this.listAll();
  }

  listAll() {
    this.produtoService.listAll().subscribe((data)=>{
     // console.log(data);
      this.products = data;
    });
  }

  public alterar(item: any) {
   const url = `cadastrar-plano-servico/${item._id}`;
   this.router.navigate([url]);
  }

}
