import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProduto } from '../../../models/category-produto.model';
import { Produto } from '../../../models/produto.model';
import { CategoryService } from '../../../services/category.service';
import { ProdutoService } from '../../../services/produto.service';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-cadastrar-category-produto',
  templateUrl: './cadastrar-category-produto.component.html',
  styleUrls: ['./cadastrar-category-produto.component.css']
})
export class CadastrarCategoryProdutoComponent implements OnInit {

  alerts: Alert[];
  errors: Array<string> = [];

  @Input()
  fileExt = 'JPG, GIF, PNG, JPEG';
  @Input()
  maxFiles = 5;
  @Input()
  maxSize = 5; // 5MB
  public dragAreaClass = 'dragarea';
  public fileData;
  public arquivos;
  public fileSelected;
  public imageBase64;

  public modoAlteracao: boolean;

  public produtos: Produto[];

  public produtoModel: Produto;
  public categoryProdutoModel: CategoryProduto;
  public produtctsSelected: Produto[];
  public productSel: Produto;

  constructor(private router: Router,
    private produtoService: ProdutoService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {

    this.produtctsSelected = [];
    this.modoAlteracao = false;

    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        let lCategoryModel: CategoryProduto;
        lCategoryModel = {
          _id: params['id']
        };
        this.modoAlteracao = true;
        categoryService.getOne(lCategoryModel).subscribe((data) => {
          this.categoryProdutoModel = <CategoryProduto>data;
          this.produtctsSelected = this.categoryProdutoModel.products;
          if (this.categoryProdutoModel.imagePrincipal) {
            this.categoryService.getImageProduto(this.categoryProdutoModel._id).subscribe(response => {
              if (response.image) {
                this.imageBase64 = 'data:image/jpeg;base64,' + response.image;
              }
            });
          }
        });
      }
    });
  }

  ngOnInit() {
    this.produtoModel = {};
    this.categoryProdutoModel = {};
    this.produtos = [];
    this.alerts = [];
    this.listAllProducts();
  }

  private listAllProducts() {
    this.produtoService.listAll().subscribe((data) => {
      this.produtos = data;
    });
  }

  public addProduct() {
    if (this.produtctsSelected !== undefined && this.productSel !== null
      && this.produtctsSelected.filter(item => item._id === this.productSel._id).length < 1) {
      this.produtctsSelected.push(this.productSel);
    }
  }

  public save() {
    // let professional: Professional = this.produtoModel;

    const categoryModel = Object.assign({}, this.categoryProdutoModel);

    if (this.arquivos && this.arquivos[0].arquivo) {
      categoryModel.fileImage = this.arquivos[0].arquivo;
      categoryModel.imagePrincipal = this.arquivos[0].nomeArquivo;
    }

    if (!categoryModel.name) {
      this.addAlertWarn('O campo Nome é obrigatório');
      return;
    }
    if (!categoryModel.description) {
      this.addAlertWarn('O campo Descrição é obrigatório');
      return;
    }
    if (!this.produtctsSelected || this.produtctsSelected.length < 1) {
      this.addAlertWarn('O campo Produtos/Serviços é obrigatório');
      return;
    }

    categoryModel.products = [];

    this.produtctsSelected.forEach(element => {
      categoryModel.products.push(element._id);
    });

    if (categoryModel._id) {
      this.categoryService.update(categoryModel).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/category-produtos']);
      }, error => {
        if (error.error && error.error.message) {
          this.addAlertError(error.error.message);
        }
      });
    } else {
      this.categoryService.add(categoryModel).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/category-produtos']);
      }, error => {
        if (error.error && error.error.message) {
          this.addAlertError(error.error.message);
        }
      });
    }
  }

  public async onFileChange(event) {
    const files = event.target.files;
    this.fileSelected = files[0];
    const fileContents = await this.handleUpload(files);
    this.arquivos = fileContents;
  }

  public handleUpload = async files => {
    const fileContents = await this.readAsBufferBytes(files);
    return fileContents;
  }

  private readAsBufferBytes(files) {
    this.getBase64 = this.getBase64.bind(this);
    this.errors = []; // Clear error
    const arquivos = [];
    // Validando tamanho e extensao dos arquivos
    if (files.length > 0 && !this.isValidFiles(files)) {
      // this.uploadStatus.emit(false);
      return;
    }

    if (files.length > 0) {
      for (let j = 0; j < files.length; j++) {
        this.fileData = new Blob([files[j]]);
        // Cria o promisse para o getBuffer
        const promise = new Promise(this.getBase64);
        // Aguarda o promisse ser resolvido, ou retornar um erro
        promise.then(data => {
          // Aqui já temos os os bytes | string base64 do arquivo para uso
          // console.log(data);
          const arq = {
            nomeArquivo: files[j].name,
            arquivo: data
          };
          if (data) {
            this.imageBase64 = 'data:image/jpeg;base64,' + data;
          }
          arquivos.push(arq);
        }).catch(function (err) {
          // console.log('Error: ', err);
        });
      }
    }
    return arquivos;
  }

  /*
   Create a function which will be passed to the promise
   and resolve it when FileReader has finished loading the file.
   */
  public getBuffer(resolve) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(this.fileData);
    reader.onload = function () {
      const arrayBuffer = <ArrayBuffer>reader.result;
      const bytes = new Uint8Array(arrayBuffer);
      resolve(bytes);
    };
  }

  public getBase64 = resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = function () {
      resolve((<string>reader.result).split('base64,')[1]);
    };
  }

  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.maxFiles) {
      const msg = 'Error: Você pode anexar no máximo 5 arquivos ' + this.maxFiles + ' arquivos';
      this.addAlertWarn(msg);
      this.errors.push(msg);
      return;
    }
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }

  private isValidFileExtension(files) {
    // Make array of file extensions
    const extensions = this.fileExt.split(',').map(function (x) {
      return x.toLocaleUpperCase().trim();
    });
    for (let i = 0; i < files.length; i++) {
      // Get file extension
      const ext =
        files[i].name
          .toUpperCase()
          .split('.')
          .pop() || files[i].name;
      // Check the extension exists
      const exists = extensions.indexOf(ext);
      if (exists < 0) {
        const msg = 'Error (Extensão inválida): ' + files[i].name;
        this.addAlertWarn(msg);
        this.errors.push(msg);
      }
      // Check file size
      this.isValidFileSize(files[i]);
    }
  }

  private isValidFileSize(file) {
    const fileSizeinMB = file.size / (1024 * 1000);
    const size = Math.round(fileSizeinMB * 100) / 100; // convert para 2 decimais
    let msg = '';
    if (size > this.maxSize) {
      msg = 'O rquivo ' +
        file.name +
        ': excedeu o tamanho limite para o arquivo de ' +
        this.maxSize +
        'MB ( ' +
        size +
        'MB )';
      this.addAlertWarn(msg);
      this.errors.push(msg);
    }
  }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) async onDrop(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    const fileContents = await this.handleUpload(files);
    this.arquivos = fileContents;
    // this.saveFiles(files);
  }

  private addAlertError(message: string) {
    this.addAlert('danger', message);
  }

  private addAlertWarn(message: string) {
    this.addAlert('warning', message);
  }

  private addAlert(type: string, message: string) {
    const alert = { type: type, message: message };
    if (this.alerts.indexOf(alert) === -1) {
      this.alerts.push(alert);
      window.scroll(0, 0);
      setTimeout(() => {
        this.close(alert);
      }, 8000);
    }
  }

  private close(alert: Alert) {
    const indexRemove = this.alerts.indexOf(alert);
    if (indexRemove !== -1) {
      this.alerts.splice(indexRemove, 1);
    }
  }

  public remove = (elemt: any, itemToRemove: any) => {
    const ax = elemt.indexOf(itemToRemove);
    if (ax !== -1) {
      elemt = elemt.splice(ax, 1);
    }
    return elemt;
  }

  public cancel() {
    this.router.navigate(['/category-produtos']);
  }

}
