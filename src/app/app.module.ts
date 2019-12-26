import { ProdutoClubService } from './services/produto.service.club';
import { ProductPlanClubService } from './services/productplan.service.club';
import { ProdutoPlanoComponent } from './pages/cadastrar-plano-servico/produto-plano.component';
import { AreaPartnerService } from './services/area.service';
import { AreaPartnerComponent } from './pages/area-partner/area-partner.component';
import { CadastrarAreaPartnerComponent } from './pages/area-partner/cadastrar-area-partner/cadastrar-area-partner.component';
import { EmpresasParceiraComponent } from './pages/empresas-parceira/empresas-parceira.component';
import { ValidarCodigoComponent } from './pages/validar-codigo/validar-codigo.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
// tslint:disable-next-line: max-line-length
import { CadastrarCategoryProdutoComponent } from './pages/category-produto/cadastrar-category-produto/cadastrar-category-produto.component';
import { CategoryProdutoComponent } from './pages/category-produto/category-produto.component';
import { CadastrarClientesComponent } from './pages/clientes/cadastrar-clientes/cadastrar-clientes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { CadastrarEmpresaComponent } from './pages/empresas/cadastrar-empresa/cadastrar-empresa.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarProdutoComponent } from './pages/produto/cadastrar-produto/cadastrar-produto.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CadastrarProfissionalComponent } from './pages/profissionais/cadastrar-profissional/cadastrar-profissional.component';
import { ProfissionaisComponent } from './pages/profissionais/profissionais.component';
import { TransacoesComponent } from './pages/financeiro/transacoes.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { ProductPlanService } from './services/productplan.service';
import { CategoryPlanService } from './services/categoryplan.service';
import { ClienteService } from './services/cliente.service';
import { CompanyService } from './services/company.service';
import { ContratoService } from './services/contrato.service';
import { EventService } from './services/event.service';
import { ProductService } from './services/product.service';
import { ProdutoService } from './services/produto.service';
import { ProfessionalService } from './services/professional.service';
import { RegisterService } from './services/register.service';
import { SectionService } from './services/section.service';
import { UserService } from './services/user.service';
import { TransacoesService } from './services/transacoes.service';
import { UiModule } from './ui/ui.module';
import { MapsApiService } from './services/maps.service';
import { AtivarUsuarioComponent } from './pages/ativar-usuario/ativar-usuario.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TrocarSenhaUsuarioComponent } from './pages/trocar-senha-usuario/trocar-senha-usuario.component';
import { NotificacoesComponent } from './pages/notificacoes/notificacoes.component';
import { MensagensComponent } from './pages/mensagens/mensagens.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { CadastrarPagamentoComponent } from './pages/pagamento/cadastrar-pagamento/cadastrar-pagamento.component';
import { CadastrarEmpresaParceiraComponent } from './pages/empresas-parceira/cadastrar-empresa-parceira/cadastrar-empresa-parceira.component';
import { CompanyPartnerService } from './services/company-partner.service';
import { CadastrarPlanoServicoComponent } from './pages/cadastrar-plano-servico/cadastrar-plano-servico.component';
import { CadastrarPlanoCategoriaComponent } from './pages/cadastrar-plano-categoria/cadastrar-plano-categoria.component';
import { TagInputModule } from 'ngx-chips';



@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    ProfissionaisComponent,
    EmpresasComponent,
    AreaPartnerComponent,
    EmpresasParceiraComponent,
    ClientesComponent,
    ConfiguracoesComponent,
    LoginComponent,
    AgendamentosComponent,
    CadastrarEmpresaComponent,
    CadastrarEmpresaParceiraComponent,
    CadastrarProfissionalComponent,
    CadastrarClientesComponent,
    CadastrarAreaPartnerComponent,
    CadastroComponent,
    ProdutoComponent,
    CadastrarProdutoComponent,
    CategoryProdutoComponent,
    CadastrarCategoryProdutoComponent,
    TransacoesComponent,
    AtivarUsuarioComponent,
    TrocarSenhaUsuarioComponent,
    NotificacoesComponent,
    MensagensComponent,
    PagamentoComponent,
    CadastrarPagamentoComponent,
    ValidarCodigoComponent,
    CadastrarPlanoServicoComponent,
    CadastrarPlanoCategoriaComponent,
    ProdutoPlanoComponent
  ],
  imports: [
    TagInputModule,
    BrowserModule,
    UiModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    CoreModule,
    NgxMaskModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCaHOU95Bm7H3JtD2fSaXvA_2daeQtuRJQ',
      libraries: ['places']
    }),
  ],
  providers: [AuthService,
    UserService,
    ClienteService,
    CompanyPartnerService,
    AreaPartnerService,
    ContratoService,
    ProdutoService,
    CompanyService,
    ProductService,
    ProductPlanService,
    ProdutoClubService,
    ProductPlanClubService,
    CategoryService,
    CategoryPlanService,
    RegisterService,
    ProfessionalService,
    SectionService,
    EventService,
    MapsApiService,
    TransacoesService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
