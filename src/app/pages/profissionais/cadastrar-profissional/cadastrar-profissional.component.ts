import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base/base-component';
import { MapsApiService } from 'src/app/services/maps.service';
import { Professional } from '../../../models/professional.model';
import { ProfessionalService } from '../../../services/professional.service';
import { UserService } from '../../../services/user.service';
import { timeoutWith } from 'rxjs/operators';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [
  /*
  {
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
  }*/
];


@Component({
  selector: 'app-cadastrar-profissional',
  templateUrl: './cadastrar-profissional.component.html',
  styleUrls: ['./cadastrar-profissional.component.css']
})
export class CadastrarProfissionalComponent extends BaseComponent implements OnInit {

  public maskPhone: string;
  public maskWhatsApp: string;

  errors: Array<string> = [];
  @Input()
  fileExt = 'JPG, GIF, PNG, DOC, DOCX, PDF, TXT, XLS, XLSX, JPEG, PPT, PPTX, CSV';
  @Input()
  maxFiles = 5;
  @Input()
  maxSize = 5; // 5MB
  public dragAreaClass = 'dragarea';
  public fileData;
  public arquivos;
  public certificados = [];
  public fileSelected;

  public professionalModel: Professional;
  public segmentoSelected: any;

  public segmentosSelected: any[];

  alerts: Alert[];
  private _id: string;

  public modoAlteracao = false;

  private listDeletarCertificado = [];

  public products: any[] = [];

  constructor(private userService: UserService,
    private router: Router,
    private professionalService: ProfessionalService,
    private route: ActivatedRoute,
    private mapApiService: MapsApiService) {

    super();

    this.reset();

    this.modoAlteracao = false;
    this.route.params.subscribe(params => {
      this._id = params['id'];
      if (this._id) {
        this.modoAlteracao = true;
        let lProfessionalModel: Professional;
        lProfessionalModel = {
          _id: this._id
        };

        professionalService.getOne(lProfessionalModel).subscribe((data) => {
          console.log(data);
          this.professionalModel = data[0];
          this.professionalModel.confirma_password = this.professionalModel.password;
          if (this.professionalModel.segmento) {
            this.segmentosSelected = this.professionalModel.segmento.split(',');
          }
        });
      }
    });
  }

  ngOnInit() {
    this.maskPhone = this.maskWhatsApp = this.getMaskPhone();
    this.professionalModel = {};
    this.segmentosSelected = [];
    this.buscarCategorias();
  }

  private tratarErro(err) {
    console.log(err);
    if (err.error && err.error.message) {
      console.log(err.error.message);
    }
  }

  public buscarCategorias(){
    this.professionalService.buscarCategoryProducts().subscribe((categories: any[]) => {
      this.products = [];
      categories.map(categ => {
        categ.products.map(prodt => {
          prodt.active = false;
          this.professionalModel.products.map(produto => {
            if(prodt._id === produto){
              prodt.active = true;
            }
          });
        });
        this.products.push(categ);
        console.log(this.products);
      });
    }, err => {
      this.tratarErro(err);
    });
  }

  addSegmento() {
    if (this.segmentoSelected !== undefined && this.segmentoSelected !== null
      && this.segmentosSelected.indexOf(this.segmentoSelected) === -1) {
      this.segmentosSelected.push(this.segmentoSelected);
    }
  }

  public enviarArquivos() {
    const formData = new FormData();
    const arquivo = this.fileSelected;
    formData.append('file', arquivo);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const resposta = xhr.responseText;
        console.log(resposta);
      }
    };
    xhr.open('POST', 'http://localhost:7790/fsapi/profissional/precadastro');
    xhr.send(formData);
  }

  public deleteCertificado(fileName: string) {
    this.listDeletarCertificado.push(fileName);
    this.remove(this.professionalModel.fileNameCertificados, fileName);
  }

  public save() {
    // let professional: Professional = this.professionalModel;

    let professional = Object.assign({}, this.professionalModel);

    let arrProdtsSel = [];
    this.products.map(categ => {
      categ.products.map(prodt => {
        if(prodt.active){
          arrProdtsSel.push(prodt);
        }
      });
    });

    professional.products = arrProdtsSel;

    if (this._id) {
      professional['_id'] = this._id;
    }

    const segmentos = this.segmentosSelected.toString();

    professional.segmento = segmentos;
    if (this.arquivos && this.arquivos[0]) {
      professional.fileAntecedentesCriminais = this.arquivos[0].arquivo;
      professional.fileName = this.arquivos[0].nomeArquivo;
    } else if (!this._id || !professional.fileName) {
      this.addAlertWarn('As antecedentes criminais são obrigatórias');
      return;
    }


    if (professional.possuiCursos === 'Nao' && professional.fileNameCertificados && professional.fileNameCertificados.length > 0) {
      this.listDeletarCertificado = professional.fileNameCertificados;
      this.certificados = [];
    } else if (professional.possuiCursos === 'Sim' && ((this._id && (!professional.fileNameCertificados ||
      professional.fileNameCertificados.length < 1) && (!this.certificados || this.certificados.length < 1))
      || (!this._id && !this.certificados))) {
      this.addAlertWarn('Os certificados são obrigatórios caso possua');
      return;
    } else {
      professional.fileCertificados = [];
      professional.fileNameCertificados = [];
      if (this.certificados && this.certificados.length >= 1) {
        professional.fileCertificados = this.certificados.map(element => element.arquivo);
        professional.fileNameCertificados = this.certificados.map(element => element.nomeArquivo);
      }
    }

    if (this._id) {
      console.log(professional);
      professional.listDeletarCertificado = this.listDeletarCertificado;
      this.professionalService.update(professional).subscribe((data) => {
        this.router.navigate(['/profissionais']);
      }, error => {
        if (error.error && error.error.message) {
          this.addAlertError(error.error.message);
        }
      });
    } else {
      this.professionalService.precadastro(professional).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/profissionais']);
      }, error => {
        if (error.error && error.error.message) {
          this.addAlertError(error.error.message);
        }
      });
    }
  }

  public cancel() {
    this.router.navigate(['/profissionais']);
  }

  public async onFileChange(event) {
    const files = event.target.files;
    this.fileSelected = files[0];
    let carregou = false;
    if (event.srcElement.id === 'uploadCertificado') {
      carregou = await this.handleUpload({ files: files, list: this.certificados });
    } else {
      this.arquivos = [];
      carregou = await this.handleUpload({ files: files, list: this.arquivos });
    }
    if (carregou) {
      this.addAlert('success', 'Arquivo enviado com sucesso!');
    }
  }

  public handleUpload = async files => {
    return await this.readAsBufferBytes(files.files, files.list);
  }

  private readAsBufferBytes(files, list) {
    this.getBase64 = this.getBase64.bind(this);
    this.errors = []; // Clear error
    // Validando tamanho e extensao dos arquivos
    if (files.length > 0 && !this.isValidFiles(files)) {
      // this.uploadStatus.emit(false);
      return;
    }
    if (files.length > 0) {
      let valido = true;
      for (let j = 0; j < files.length; j++) {
        this.fileData = new Blob([files[j]]);
        // Cria o promisse para o getBuffer
        const promise = new Promise(this.getBase64);
        // Aguarda o promisse ser resolvido, ou retornar um erro
        promise
          .then(data => {
            // Aqui já temos os os bytes | string base64 do arquivo para uso
            const arq = {
              nomeArquivo: files[j].name,
              arquivo: data
            };
            if (list.length >= this.maxFiles || list.filter(item => item.nomeArquivo === arq.nomeArquivo).length > 0) {
              valido = false;
            } else {
              list.push(arq);
            }
          })
          .catch(function (err) {
            // console.log('Error: ', err);
          });
      }
      return valido;
    }
    return false;
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
      this.errors.push(
        'Error: Você pode anexar no máximo 5 arquivos ' + this.maxFiles + ' arquivos'
      );
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
        this.errors.push('Error (Extensão inválida): ' + files[i].name);
        this.addAlertError('Error (Extensão inválida): ' + files[i].name);
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
    let carregou = false;
    if (event.srcElement.id === 'uploadCertificado') {
      carregou = await this.handleUpload({ files: files, list: this.certificados });
    } else {
      this.arquivos = [];
      carregou = await this.handleUpload({ files: files, list: this.arquivos });
    }
    if (carregou) {
      this.addAlert('success', 'Arquivo enviado com sucesso!');
    }

    // this.saveFiles(files);
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
      // window.scroll(0, 0);
      setTimeout(() => {
        this.close(alert);
      }, 8000);
    }
  }

  close(alert: Alert) {
    const indexRemove = this.alerts.indexOf(alert);
    if (indexRemove !== -1) {
      this.alerts.splice(indexRemove, 1);
    }
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

  public remove = (elemt: any, itemToRemove: any) => {
    const ax = elemt.indexOf(itemToRemove);
    if (ax !== -1) {
      elemt = elemt.splice(ax, 1);
    }
    return elemt;
  }

  public onKeydownWhats(event) {
    if (event.target && !this.isNullOrUndefinedOrEmpty(event.target.value)) {
      this.maskWhatsApp = this.getMaskPhone(event.target.value);
    }
  }

  public onKeydownPhone(event) {
    if (event.target && !this.isNullOrUndefinedOrEmpty(event.target.value)) {
      this.maskPhone = this.getMaskPhone(event.target.value);
    }
  }

  public onBlurCep() {
    if (this.professionalModel.cep) {
      this.mapApiService.findByCep(this.professionalModel.cep)
        .subscribe(data => {
          if (data && !data.erro && data._body) {
            const retorno = JSON.parse(data._body);
            this.professionalModel.logradouro = retorno.logradouro;
            this.professionalModel.bairro = retorno.bairro;
            this.professionalModel.cidade = retorno.localidade;
            this.professionalModel.uf = retorno.uf;
          }
        });
    }
  }

  public selecionarProduto(item){
    item.active = !item.active;
    console.log(item);
    console.log(this.products)
  }

}
