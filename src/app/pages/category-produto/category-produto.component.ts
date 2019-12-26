import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryProduto } from '../../models/category-produto.model';

@Component({
  selector: 'app-category-produto',
  templateUrl: './category-produto.component.html',
  styleUrls: ['./category-produto.component.css']
})
export class CategoryProdutoComponent implements OnInit {

  public categories: any[];

  constructor( private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = [];
    this.listAll()
  }


  listAll(){
    this.categoryService.listAll().subscribe((data)=>{
      console.log(data);
      this.categories = data;
    });
  }

  public alterar(item: any) {
   const url = `category-produtos/cadastrar/${item._id}`;
   this.router.navigate([url]);
  }

}
