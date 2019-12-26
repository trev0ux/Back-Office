import { Component, OnInit} from '@angular/core';
import {BaseComponent} from 'src/app/core/base/base-component';


@Component({
  selector: 'app-cadastrar-plano-categoria',
  templateUrl: './cadastrar-plano-categoria.component.html',
  styleUrls: ['./cadastrar-plano-categoria.component.css'],
})
export class CadastrarPlanoCategoriaComponent extends BaseComponent implements OnInit {

  public categoryServicePlano: any[] = [
    'Massagem',
    'Corte',
    'Penteado'
  ];
  public categoryServicePlanoSel: any;
  public categoriesServicePlanoSelected: any[] = [];

  /* VARIAVEIS PARA ADD ITEM */

  public itemSel: any;
  public categorieItemSelected: any[] = [];

  /* FUNÇÕES PARA ADD E REMOVER AS TAGS */

  public addServicePlanoCategory() {
    if (!this.isNullOrUndefinedOrEmpty(this.categoryServicePlanoSel)) {
      this.categoriesServicePlanoSelected.push(this.categoryServicePlanoSel);
      this.categoryServicePlanoSel = undefined;
    }
  }

  public addItem() {
    if (!this.isNullOrUndefinedOrEmpty(this.itemSel)) {
      this.categorieItemSelected.push(this.itemSel);
      const item = {
        'name': this.itemSel.name,
        'id': this.itemSel._id
      };
    }
  }

  public remove = (elemt: any, itemToRemove: any) => {
    const ax = elemt.indexOf(itemToRemove);
    if (ax !== -1) {
      elemt = elemt.splice(ax, 1);
    }
    return elemt;
  }



  constructor() {
    super();
   }


  ngOnInit() {
  }

}
