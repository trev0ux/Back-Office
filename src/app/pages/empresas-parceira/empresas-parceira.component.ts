import { CompanyPartnerService } from './../../services/company-partner.service';
import { CompanyService } from '../../services/company.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit, Host } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-empresas-parceira',
  templateUrl: './empresas-parceira.component.html',
  styleUrls: ['./empresas-parceira.component.css']
})
export class EmpresasParceiraComponent implements OnInit {

  public companyModel: any;
  public empresas: any[] = [];

  constructor(private productService: ProductService,
              private companyService: CompanyPartnerService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.companyModel = {};

    this.all();
  }

  public alterar(item: any) {
   const url = `empresas/parceira/cadastrar/${item._id}`;
   this.router.navigate([url]);
  }

  all(){
    this.companyService.listAll().subscribe((data)=>{
        console.log(data);
        this.empresas = data;
    });
  }

  excluir(item: any){
    const company : Company = {_id: <string> item._id};
    this.companyService.remove(company).subscribe((data)=>{
        console.log(data);
        this.empresas = data;
    });
  }

}
