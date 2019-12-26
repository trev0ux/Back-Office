import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  public products: any[];
  public produtoModel: Produto = {};

  constructor( private router: Router,
               private produtoService: ProdutoService) { }

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
   const url = `produtos/cadastrar/${item._id}`;
   this.router.navigate([url]);
  }

}
