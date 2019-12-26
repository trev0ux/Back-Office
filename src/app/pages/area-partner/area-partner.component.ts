import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { AreaPartnerService } from '../../services/area.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryProduto } from '../../models/category-produto.model';

@Component({
  selector: 'app-area-partner',
  templateUrl: './area-partner.component.html',
  styleUrls: ['./area-partner.component.css']
})
export class AreaPartnerComponent implements OnInit {

  public categories: any[];

  constructor( private router: Router, private categoryService: AreaPartnerService) { }

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
   const url = `area-partner/cadastrar/${item._id}`;
   this.router.navigate([url]);
  }

}
