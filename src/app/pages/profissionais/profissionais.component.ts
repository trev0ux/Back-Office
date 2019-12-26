import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base/base-component';
import { ProfessionalService } from '../../services/professional.service';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profissionais.component.css']
})
export class ProfissionaisComponent extends BaseComponent implements OnInit {

  public professionalsInTrainning: any[] = [];

  public professionalsApproved: any[] = [];

  public professionalsPreCadastrados: any[] = [];

  public professionalsDisableds: any[] = [];

  public professionalsEmAvaliacao: any[] = [];

  public imgDoc: any[] = [];

  public profSel: any = {};

  public motivo: string;

  public categoriasProfSel: any[];

  public hasDesactivesProfessionals = true;

  constructor(private userService: UserService,
    private professionalService: ProfessionalService,
    private router: Router, private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
    console.log(this.router.url);

    if( this.router.url === '/desativados') {
      this.hasDesactivesProfessionals = false;
      this.listAllDesativado();
    } else {
      this.listAllProfessionalsActived();
      this.listAllProfessionalsInTrainning();
      this.listAllPreCadastrados();
      this.listAllEmAvaliacao();
    }
  }

  downloadOld(fileName: string) {
    this.professionalService.download(fileName).subscribe((data) => {
      console.log(data);
    });
  }

  public alterar(item: any) {
    let idProfessional = item.idProfessional;
    if (!idProfessional) {
      idProfessional = item._id;
    }
    const url = `profissionais/cadastrar/${idProfessional}`;
    this.router.navigate([url]);
  }

  public verDocumento(item:any, content: any){
    this.profSel = item;
    this.buscarCategorias();
    console.log(item);
    this.imgDoc = item.fileNameCertificados;
    this.modalService.open(content, { size: 'lg' });
  /*  this.imgDoc.forEach(element => {
      element = 'data:image/jpeg;base64,' + element;
      console.log(element)
    });
    console.log(this.imgDoc);*/

    // if (this.servicos && this.servicos.length > 0) {
    //   this.servicos.forEach(element => {
    //       this.webservices.buscarImagemCategoria(element.id).subscribe(data => {
    //           if (data && data['image']) {
    //               element.image = 'data:image/jpeg;base64,' + data['image'];
    //           }
    //       });
    //   });
    // }
  }

  public buscarCategorias(){
    this.categoriasProfSel = [];
    this.professionalService.buscarCategoryProducts().subscribe((categories: any[]) => {
      categories.map(categ => {
        categ.products.map(prodt => {
          this.profSel.products.map(item =>{
            if(prodt._id == item){
              this.categoriasProfSel.push(prodt.name);
            }
          });
        });
      });
    }, err => {
      // this.tratarErro(err);
    });
  }


  public reprovarProfissional(content: any, pProfSel: any){
    this.profSel = pProfSel;
    this.modalService.open(content);
  }


  public download(profissional) {
    this.professionalService.downloadArquivos(profissional._id).subscribe(
      file => {
        console.log(file);
        this.processDownloadOld(file, `Arquivo_${profissional._id}.zip`);
      },
      error => {
        // this.notificacoes.showAlert(true, error.message, "error");
        // this.errors.push(error.ExceptionMessage);
      }
    );
  }

  public processDownloadOld(data, name) {

    const blob = data;
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, name);
    } else {
      const link = document.createElement('a');

      link.href = URL.createObjectURL(blob);

      link.setAttribute('visibility', 'hidden');
      link.download = name;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private listAll() {
    this.listAllProfessionalsActived();
    this.listAllProfessionalsInTrainning();
    this.listAllPreCadastrados();
    this.listAllEmAvaliacao();
  }

  listAllProfessionalsActived() {
    this.userService.listAllProfessionals().subscribe((data) => {
      console.log(data);
      this.professionalsApproved = data;
    });
  }

  listAllProfessionalsInTrainning() {
    this.professionalService.listAllEmtreinamento().subscribe((data) => {
      console.log(data);
      this.professionalsInTrainning = data;
    });
  }

  listAllPreCadastrados() {
    this.professionalService.listAllPreCadastrados().subscribe((data) => {

      this.professionalsPreCadastrados = data;
    });
  }

  listAllEmAvaliacao() {
    this.professionalService.listAllEmAvaliacao().subscribe((data) => {
      this.professionalsEmAvaliacao = data;
    });
  }

  listAllDesativado() {
    this.professionalService.listAllDesativados().subscribe((data) => {
      this.professionalsDisableds = data;
    });
  }

  // enum: ['Aprovado', 'Pre-cadastrado', 'Treinamento', 'Avaliacao', 'Desativado'],
  aprovar(professionaSel: any, statusActual: string, modal?: any) {
    let newStatus = 'Pre-cadastrado';
    if ('Pre-cadastrado' === statusActual) {
      newStatus = 'Treinamento';
    } else if ('Treinamento' === statusActual) {
      newStatus = 'Avaliacao';
    } else if ('Avaliacao' === statusActual) {
      newStatus = 'Aprovado';
    } else if ('Desativado' === statusActual) {
      newStatus = statusActual;
    }

    const userApproved = {
      name: professionaSel.name,
      email: professionaSel.email,
      password: professionaSel.password,
      idProfessional: professionaSel._id,
      cpf: professionaSel.cpf,
      phone: professionaSel.phone,
      instagram: professionaSel.instagram,
      status: newStatus,
      motivoStatus: this.profSel.motivo
    };

    this.userService.activeProfessional(userApproved).subscribe((data) => {
      console.log(data);

      if (this.router.url === '/desativados') {
        this.hasDesactivesProfessionals = false;
        this.listAllDesativado();
      } else {
        if(modal){
          modal.close();
        }
        this.listAll();
      }
    });

  }

  desaprovar(statusActual: string, modal: any) {
    this.profSel.motivo = this.motivo + ' : ' + this.profSel.motivo;
    this.aprovar(this.profSel, statusActual);
    modal.close();
    this.listAll();
  }
}
