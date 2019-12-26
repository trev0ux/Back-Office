import { MapsAPILoader } from '@agm/core';
import { Component, NgZone, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base/base-component';
import { IModel } from '../../../models/model';
import { CategoryService } from '../../../services/category.service';
import { CategoryPlanService } from '../../../services/categoryplan.service';
import { CompanyService } from '../../../services/company.service';
import { UserService } from '../../../services/user.service';

/// <reference types="@types/googlemaps" />
declare const InstallTrigger: any;
declare const google: any;
declare const adapter;

interface Alert {
  type: string;
  message: string;
}
/*
const ALERTS: Alert[] = [{
    type: 'success',
    message: 'This is an success alert',
  }, {
    type: 'info',
    message: 'This is an info alert',
  }, {
    type: 'warning',
    message: 'This is a warning alert',
  }, {
    type: 'danger',
    message: 'This is a danger alert',
  }
];*/

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'danger',
  message: 'Alguns campos obrigatórios não foram preenchidos!',
}];

@Component({
  selector: 'app-cadastrar-empresa',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css']
})
export class CadastrarEmpresaComponent extends BaseComponent implements OnInit {

  /*CATEGORIAS DO PLANO QUE PODEM SER ADICIONADAS NO SELECT*/
 public categoryPlan: any[] = [];

   /* VARIAVEIS PARA ADD ITEM */

  public valorTotalSel: any;
  public valueTotalSelected: any[] = [];
  public company: any = {};
  public products: any[] = [];
  public productsplan: any[] = [];
  public categoryProducts: any[] = [];
  public attendanceDays: any[] = [];
  public categoriesProductsSelected: any[] = [];
  public categoriesPlanSelected: any [] = [];
  public servicesDiscountsSelected: any[] = [];
  public professionalsAttendenceSelected: any[] = [];
  public professionals: any[] = [];
  public discounts: any[] = [];
  public attendanceDaySelected: any;
  public Data: any;
  public hourAttendanceIni: any;
  public hourAttendanceEnd: any;
  public categorySel: any;
  public categoryPlanSel: any;
  public productSel: any;
  public productPlanSel: any;
  public discountSel: any;
  public professionalSel: any;
  public tokenNum: any;
  public categoryProductsPlan: any;
  public tokenFinal: any;
  private _id: string;
  alerts: Alert[];

  public qtdClients: number;
  public orMore = false;

  public maskPhone: string;

  @ViewChild('gmap') gmapElement: any;
  @ViewChild('endereco') enderecoElement: any;
  map: any;
  marker: any;
  latDefault = -23.5639159;
  lngDefault = -46.6736581;
  private titleMarker = 'Local de atendimento';

  public addDia: boolean;
  public addPeriodo: boolean;
  public valorFunc: boolean;
  public modoAlteracao: boolean;

  constructor(private companyService: CompanyService,
    private categoryService: CategoryService,
    private categoryPlanService: CategoryPlanService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    super();
    this.modoAlteracao = false;
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.modoAlteracao = true;
        let lCompanyModel: any;
        this._id = params['id'];
        lCompanyModel = {
          _id: params['id']
        };

        companyService.getOne(lCompanyModel).subscribe((data) => {
          this.load(data);
          this.listAllCategories();
        });
      } else {
        this.listAllCategories();
      }
    });
  }

  ngOnInit() {
    this.company = {};
    // this.listAllProducts();
    this.products = [];
    this.productsplan = [];
    this.listAllProfessionals();
    this.attendanceDays = [];
    this.categoryProducts = [];
    this.categoryProductsPlan = [];
    this.categoriesProductsSelected = [];
    this.categoriesPlanSelected = [];
    this.servicesDiscountsSelected = [];
    this.professionals = [];
    this.professionalsAttendenceSelected = [];
    this.tokenNum = this.getRandomInt(0, 1000);
    this.maskPhone = this.getMaskPhone();
    this.initMap();


  }

  public addInput(event) {
    if ( event.target.checked) {
      this.valorFunc = true;
    } else {
      this.valorFunc = false;
    }
    }


  public mudaDiv(event) {
  if ( event.target.checked) {
    this.addDia = true;
    this.addPeriodo = false;
  } else {
    this.addDia = false;

  }
  }

  public mudaDiv2(event) {
    if ( event.target.checked) {
      this.addPeriodo = true;
      this.addDia = false;
    } else {
      this.addPeriodo = false;
    }
    }


  private initMap() {
    this.configAutoCompleteMap();
    this.configMap();
  }

  private configAutoCompleteMap() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.enderecoElement.nativeElement, { types: ['address'] });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          console.log('Addr:', place);
          this.company.endereco = place.formatted_address;
          this.company.bairro = place.vicinity;
          if (!this.company.bairro) {
            this.company.bairro = place.name;
          }
          this.company.latitude = place.geometry.location.lat();
          this.company.longitude = place.geometry.location.lng();
          this.setMarker(place.geometry.location, true);
        });
      });
    });
  }

    public removeTeste = (elemt: any, itemToRemove: any) => {
      const ax = elemt.indexOf(itemToRemove);
      if (ax !== -1) {
        elemt = elemt.splice(ax, 1);
      }
      return elemt;
    }

   public addValorTotal() {
    if (!this.isNullOrUndefinedOrEmpty(this.valorTotalSel)) {
      this.valueTotalSelected.push(this.valorTotalSel);
      this.valorTotalSel = undefined;
    }
  }

  private configMap() {
    const myLatLng = {
      lat: this.latDefault,
      lng: this.lngDefault
    };
    const map = new google.maps.Map(this.gmapElement.nativeElement, {
      zoom: 16,
      center: myLatLng,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.map = map;
    google.maps.event.addListener(this.map, 'click', (event) => { this.onClickMap(event); });
  }

  public onClickMap(event) {
    if (event && event.latLng) {
      this.company.latitude = event.latLng.lat();
      this.company.longitude = event.latLng.lng();
      this.setMarker(event.latLng);
    }
  }

  private setMarker(latLng, autoCenter?: boolean) {
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: this.titleMarker
    });
    if (autoCenter) {
      this.map.setCenter(latLng);
    }
  }

  private createLatLng(latitude, longitude) {
    return { lat: Number(latitude), lng: Number(longitude) };
  }

  /*
  public consultarEndereco() {
    if (this.company.endereco) {
      this.mapsService
        .findFromAddress(this.company.endereco, this.company.cep)
        .subscribe(response => {
          if (response.status === 'OK') {
            this.company.latitude = response.results[0].geometry.location.lat;
            this.company.longitude = response.results[0].geometry.location.lng;
            this.setMarker(this.createLatLng(this.company.latitude, this.company.longitude), true);
          } else if (response.status === 'ZERO_RESULTS') {
            console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
          } else {
            console.log('geocodingAPIService', 'Other error', response.status);
          }
        });
    }
  }
  */

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public generateAcessCode() {
    this.company.acessCode = `${this.company.fantasyName}${this.tokenNum}`;
  }

  public addAttendanceDay() {
    if (!this.isNullOrUndefinedOrEmpty(this.attendanceDaySelected)
      && !this.isNullOrUndefinedOrEmpty(this.hourAttendanceIni)
      && !this.isNullOrUndefinedOrEmpty(this.Data)
      && !this.isNullOrUndefinedOrEmpty(this.hourAttendanceEnd)
      && this.hourAttendanceIni < this.hourAttendanceEnd) {
      const day = {
        Data: this.Data,
        nameDay: this.attendanceDaySelected,
        hourInit: this.hourAttendanceIni,
        hourEnd: this.hourAttendanceEnd
      };
      const contains = this.attendanceDays.filter(item => item.nameDay === day.nameDay
        && item.hourInit === day.hourInit
        && item.Data === day.Data
        && item.hourEnd === day.hourEnd).length;
      if (contains < 1) {
        this.attendanceDays.push(day);
      }
    }
  }

  public loadListProducts(removeCategory?) {
    this.products = [];
    if (this.categoriesProductsSelected) {
      this.categoriesProductsSelected.forEach(cate => {
        const find = this.categoryProducts.filter(c => c._id === cate.id);
        if (find.length > 0 && find[0]) {
          const category = find[0];
          if (category.products) {
            category.products.forEach(prod => {
              if (this.products.filter(i => i._id === prod._id).length < 1) {
                this.products.push(prod);
              }
            });
          }
        }
      });
      if (!this.categoriesProductsSelected || this.categoriesProductsSelected.length < 1) {
        this.productSel = undefined;
        this.discountSel = undefined;
        this.servicesDiscountsSelected = [];
      } else if (removeCategory) {
        this.productSel = undefined;
        this.discountSel = undefined;
        const findRemove = this.categoryProducts.filter(c => c._id === removeCategory.id);
        if (findRemove && findRemove[0]) {
          const remove = findRemove[0];
          if (remove.products && this.servicesDiscountsSelected) {
            this.servicesDiscountsSelected.forEach(cateProducSelec => {
              const list = remove.products.filter(prodRemove => prodRemove._id === cateProducSelec.id);
              if (list) {
                list.forEach(r => {
                  const index = this.servicesDiscountsSelected.findIndex(i => i.id === r._id);
                  if (index) {
                    this.servicesDiscountsSelected.splice(index, 1);
                  }
                });
              }
            });
          }
        }
      }
    }
  }

  public addCategory() {
    if (!this.isNullOrUndefinedOrEmpty(this.categorySel)
      && !this.isNullOrUndefinedOrEmpty(this.categorySel._id)) {
      const category = {
        'description': this.categorySel.description,
        'name': this.categorySel.name,
        'id': this.categorySel._id
      };
      const contains = this.categoriesProductsSelected.filter(item => item.id === category.id).length;
      if (contains < 1) {
        this.categorySel = undefined;
        this.categoriesProductsSelected.push(category);
        this.loadListProducts();
      }
    }
  }

  public addPlanCategory() {
    if (!this.isNullOrUndefinedOrEmpty(this.categoryPlanSel)
      && !this.isNullOrUndefinedOrEmpty(this.categoryPlanSel._id)) {
      const plan = {
        'description': this.categoryPlanSel.description,
        'name': this.categoryPlanSel.name,
        'id': this.categoryPlanSel._id
      };
      const contains = this.categoriesPlanSelected.filter(item => item.id === plan.id).length;
      if (contains < 1) {
        this.categoryPlanSel = undefined;
        this.categoriesPlanSelected.push(plan);
        this.loadListProductsPlan();
      }
    }
  }

  public loadListProductsPlan(removeCategoryPlan?) {
    this.productsplan = [];
    if (this.categoriesPlanSelected) {
      this.categoriesPlanSelected.forEach(cate => {
        const find = this.categoryProductsPlan.filter(c => c._id === cate.id);
        if (find.length > 0 && find[0]) {
          const plan = find[0];
          if (plan.productsplan) {
            plan.productsplan.forEach(prod => {
              if (this.productsplan.filter(i => i._id === prod._id).length < 1) {
                this.productsplan.push(prod);
              }
            });
          }
        }
      });
      if (!this.categoriesPlanSelected || this.categoriesPlanSelected.length < 1) {
        this.productPlanSel = undefined;
        this.discountSel = undefined;
        this.servicesDiscountsSelected = [];
      } else if (removeCategoryPlan) {
        this.productPlanSel = undefined;
        this.discountSel = undefined;
        const findRemove = this.categoryPlan.filter(c => c._id === removeCategoryPlan.id);
        if (findRemove && findRemove[0]) {
          const remove = findRemove[0];
          if (remove.productsplan && this.servicesDiscountsSelected) {
            this.servicesDiscountsSelected.forEach(cateProducSelec => {
              const list = remove.productsplan.filter(prodRemove => prodRemove._id === cateProducSelec.id);
              if (list) {
                list.forEach(r => {
                  const index = this.servicesDiscountsSelected.findIndex(i => i.id === r._id);
                  if (index) {
                    this.servicesDiscountsSelected.splice(index, 1);
                  }
                });
              }
            });
          }
        }
      }
    }
  }



  public toggleVisibility(e) {
    this.orMore = e.target.checked;
  }

  public addServiceAndDiscount() {
    if (!this.isNullOrUndefinedOrEmpty(this.productSel)
      && !this.isNullOrUndefinedOrEmpty(this.productSel._id)
      && !this.isNullOrUndefinedOrEmpty(this.discountSel)
      && !this.isNullOrUndefinedOrEmpty(this.qtdClients)
      && this.qtdClients > 0) {
      const prodDesc = {
        id: this.productSel._id,
        name: this.productSel.name,
        description: this.productSel.description,
        discount: this.discountSel,
        qtdClients: this.qtdClients,
        orMore: this.orMore
      };
      const contains = this.servicesDiscountsSelected.filter(
        item => item.id === prodDesc.id
          && ((item.qtdClients === prodDesc.qtdClients && item.discount === prodDesc.discount
          && item.orMore === prodDesc.orMore) || (prodDesc.qtdClients >= item.qtdClients && item.orMore))
      ).length;
      if (contains < 1) {
        this.servicesDiscountsSelected.push(prodDesc);
        this.discountSel = undefined;
        this.productSel = undefined;
        this.qtdClients = undefined;
        this.orMore = false;
      }
    }
  }

  public addProfessionals() {
    if (!this.isNullOrUndefinedOrEmpty(this.professionalSel)
      && !this.isNullOrUndefinedOrEmpty(this.professionalSel._id)) {
      const profi = {
        id: this.professionalSel._id,
        login: this.professionalSel.login,
        name: this.professionalSel.name,
        discount: this.discountSel
      };
      const contains = this.professionalsAttendenceSelected.filter(item => item.id === profi.id).length;
      if (contains < 1) {
        this.professionalsAttendenceSelected.push(profi);
      }
    }
  }

  public save() {

    const companyToSave = {
      'acessCode': this.company.acessCode,
      'name': this.company.fantasyName,
      'endereco': this.company.endereco,
      'photoURL': '',
      'patternName': this.company.patternName,
      'fantasyName': this.company.fantasyName,
      'cnpj': this.company.cnpj,
      'contacts': [this.company.contact],
      'email': this.company.email,
      'qtdEmployes': this.company.qtdEmployes,
      'attendanceDays': [],
      'categories': [],
      'productsDiscounts': [],
      'fastsProfessionals': [],
      'attendanceLocation': this.company.endereco,
      'complement': this.company.complement,
      'cep': this.company.cep,
      'latitude': this.company.latitude,
      'longitude': this.company.longitude,
      'bairro': this.company.bairro
    };

    if (this._id) {
      companyToSave['_id'] = this._id;
    }

    this.servicesDiscountsSelected.forEach(element => {
      const products = [];
      const produto = {
        'idProduct': element.id,
        'name': element.name,
        'description': element.description
      };

      const prodtDiscount = {
        'product': undefined,
        'discount': element.discount,
        'qtdClients': element.qtdClients,
        'orMore': element.orMore
      };

      if (element['_idProdt']) {
        produto['_id'] = element['_idProdt'];
      }

      if (element['_id']) {
        prodtDiscount['_id'] = element['_id'];
      }

      if (element['categories']) {
        produto['categories'] = element['categories'];
      }

      products.push(produto);

      prodtDiscount.product = products;

      companyToSave.productsDiscounts.push(prodtDiscount);
    });

    if (!this.professionalsAttendenceSelected || this.professionalsAttendenceSelected.length === 0) {
      // this.reset();

      const laertProf: Alert[] = [{
        type: 'danger',
        message: 'Informa ao menos um profissional',
      }];
      this.alerts = Array.from(laertProf);
      return;
    }

    this.professionalsAttendenceSelected.forEach(element => {
      const profissional = {
        'login': element.login,
        'name': element.name,
        'idUser': element.id
      };
      if (element['_id']) {
        profissional['_id'] = element['_id'];
      }

      companyToSave.fastsProfessionals.push(profissional);
    });

    if (!this.categoriesProductsSelected || this.categoriesProductsSelected.length === 0) {
      const laertProf: Alert[] = [{
        type: 'danger',
        message: 'Informa ao menos uma categoria',
      }
      ];
      this.alerts = Array.from(laertProf);
      return;
    }

    this.categoriesProductsSelected.forEach(element => {
      const category = {
        'description': element.description,
        'name': element.name,
        'id': element.id
      };
      if (element['_id']) {
        category['_id'] = element['_id'];
      }

      companyToSave.categories.push(category);
    });

    this.attendanceDays.forEach(element => {
      const attDay = {
        'nameDay': element.nameDay,
        'date': element.date,
        'hourInit': element.hourInit,
        'hourEnd': element.hourEnd
      };

      if (element['_id']) {
        attDay['_id'] = element['_id'];
      }

      companyToSave.attendanceDays.push(attDay);
    });

    if (this._id) {
      this.companyService.update(<IModel>companyToSave).subscribe((data) => {
        this.router.navigate(['/empresas']);
      }, error => {
        if (error.error && error.error.message) {
          this.addAlertError(error.error.message);
        }
      });
    } else {
      this.companyService.save(companyToSave).subscribe((data) => {
        this.router.navigate(['/empresas']);
      }, error => {
        if (error.error && error.error.message) {
          this.addAlertError(error.error.message);
        }
      });
    }
  }

  public remove = (elemt: any, itemToRemove: any) => {
    const ax = elemt.indexOf(itemToRemove);
    if (ax !== -1) {
      elemt = elemt.splice(ax, 1);
    }
    return elemt;
  }

  load(company: any) {
    this.company = company;
    if (this.company && this.company.latitude && this.company.longitude) {
      this.setMarker(this.createLatLng(this.company.latitude, this.company.longitude), true);
    }
    /* let companyToSave = {
           "acessCode": this.company.acessCode,
           "name": this.company.fantasyName,
           "endereco": this.company.endereco,
           "photoURL": "",
           "patternName": this.company.patternName,
           "fantasyName": this.company.fantasyName,
           "cnpj": this.company.cnpj,
           "contacts": [this.company.contact],
           "email": this.company.email,
           "qtdEmployes": this.company.qtdEmployes,
           "attendanceDays":[],
           "categories": [],
           "productsDiscounts": [],
           "fastsProfessionals": [],
           "attendanceLocation": this.company.endereco,
           "complement": this.company.complement,
           "cep": this.company.cep
       };
 */
    if (this._id) {
      this.company['_id'] = this._id;
    }

    if (this.company.contacts) {
      this.company.contact = this.company.contacts.join(',');
    }

    if (this.company.productsDiscounts) {
      this.servicesDiscountsSelected = [];
      this.company.productsDiscounts.forEach(element => {
        const products = element.product;

        if (products) {
          const produto = products[0];

          this.servicesDiscountsSelected.push({
            'name': produto.name,
            'description': produto.description,
            '_idProdt': produto._id,
            'discount': element.discount,
            'idProduct': produto.idProduct,
            'id': produto.idProduct,
            '_id': element._id,
            'categories': element.categories,
            'qtdClients': element.qtdClients,
            'orMore': element.orMore
          });
        }
      });
    }

    if (this.company.fastsProfessionals) {
      this.professionalsAttendenceSelected = [];
      this.company.fastsProfessionals.forEach(element => {

        this.professionalsAttendenceSelected.push({
          'name': element.name,
          'login': element.login,
          '_id': element._id,
          'idUser': element.idUser,
          'id': element.idUser
        });
      });
    }

    if (this.company.categories) {
      this.categoriesProductsSelected = [];
      this.company.categories.forEach(element => {

        this.categoriesProductsSelected.push({
          'description': element.description,
          'name': element.name,
          '_id': element._id,
          'id': element.id
        });
      });
    }

    if (this.company.attendanceDays) {
      this.attendanceDays = [];
      this.company.attendanceDays.forEach(element => {
        this.attendanceDays.push(
          {
            id: element._id,
            nameDay: element.nameDay,
            hourInit: element.hourInit,
            hourEnd: element.hourEnd
          }
        );
      });
    }
  }

  cancel() {
    this.router.navigate(['/empresas']);
  }

  listAllCategories() {
    this.categoryService.listAll().subscribe((data) => {
      console.log(data);
      this.categoryProducts = data;
      if (this.categoryProducts) {
        this.loadListProducts();
      }
    });
  }

  listAllCategoriesPlan() {
    this.categoryPlanService.listAll().subscribe((data) => {
      console.log(data);
      this.categoryProductsPlan = data;
      if (this.categoryProductsPlan) {
        this.loadListProductsPlan();
      }
    });
  }

  listAllProfessionals() {
    this.userService.listAllProfessionals().subscribe((data) => {
      console.log(data);
      this.professionals = data;
    });
  }

  private addAlertError(message: string) {
    this.addAlert('danger', message);
  }

  private addAlertWarn(message: string) {
    this.addAlert('warning', message);
  }

  addAlert(type: string, message: string) {
    const alert = { type: type, message: message };
    if (this.alerts.indexOf(alert) === -1) {
      this.alerts.push(alert);
      window.scroll(0, 0);
      setTimeout(() => {
        this.close(alert);
      }, 8000);
    }
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

  public onKeydownPhone(event) {
    if (event.target && !this.isNullOrUndefinedOrEmpty(event.target.value)) {
      this.maskPhone = this.getMaskPhone(event.target.value);
    }
  }


}
