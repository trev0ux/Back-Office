
import { CadastrarEmpresaParceiraComponent } from './pages/empresas-parceira/cadastrar-empresa-parceira/cadastrar-empresa-parceira.component';
import { EmpresasParceiraComponent } from './pages/empresas-parceira/empresas-parceira.component';
import { CadastrarAreaPartnerComponent } from './pages/area-partner/cadastrar-area-partner/cadastrar-area-partner.component';
import { AreaPartnerComponent } from './pages/area-partner/area-partner.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { AtivarUsuarioComponent } from './pages/ativar-usuario/ativar-usuario.component';
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
import { TransacoesComponent } from './pages/financeiro/transacoes.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarProdutoComponent } from './pages/produto/cadastrar-produto/cadastrar-produto.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CadastrarProfissionalComponent } from './pages/profissionais/cadastrar-profissional/cadastrar-profissional.component';
import { ProfissionaisComponent } from './pages/profissionais/profissionais.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LayoutComponent } from './ui/layout/layout.component';
import { TrocarSenhaUsuarioComponent } from './pages/trocar-senha-usuario/trocar-senha-usuario.component';
import { NotificacoesComponent } from './pages/notificacoes/notificacoes.component';
import { MensagensComponent } from './pages/mensagens/mensagens.component';

import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { CadastrarPagamentoComponent } from './pages/pagamento/cadastrar-pagamento/cadastrar-pagamento.component';
import { ValidarCodigoComponent } from './pages/validar-codigo/validar-codigo.component';
import { CadastrarPlanoServicoComponent } from './pages/cadastrar-plano-servico/cadastrar-plano-servico.component';
import { CadastrarPlanoCategoriaComponent } from './pages/cadastrar-plano-categoria/cadastrar-plano-categoria.component';

import { ProdutoPlanoComponent } from './pages/cadastrar-plano-servico/produto-plano.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'profissionais', component: ProfissionaisComponent, canActivate: [AuthGuardService] },
  { path: 'profissionais', component: ProfissionaisComponent, canActivate: [AuthGuardService] },
  { path: 'cadastrar-plano-servico', component: CadastrarPlanoServicoComponent, canActivate: [AuthGuardService] },
  { path: 'cadastrar-plano-categoria', component: CadastrarPlanoCategoriaComponent, canActivate: [AuthGuardService] },
  { path: 'listar/servicos/plano', component: ProdutoPlanoComponent, canActivate: [AuthGuardService] },

  { path: 'desativados', component: ProfissionaisComponent, canActivate: [AuthGuardService] },

  { path: 'produtos', component: ProdutoComponent, canActivate: [AuthGuardService] },

  { path: 'produtos/cadastrar', component: CadastrarProdutoComponent, canActivate: [AuthGuardService] },
  { path: 'produtos/cadastrar/:id', component: CadastrarProdutoComponent, canActivate: [AuthGuardService] },

  { path: 'category-produtos', component: CategoryProdutoComponent, canActivate: [AuthGuardService] },


  { path: 'category-produtos/cadastrar/:id', component: CadastrarCategoryProdutoComponent, canActivate: [AuthGuardService] },
  { path: 'category-produtos/cadastrar', component: CadastrarCategoryProdutoComponent, canActivate: [AuthGuardService] },

  { path: 'area-partner', component: AreaPartnerComponent, canActivate: [AuthGuardService] },
  { path: 'area-partner/cadastrar/:id', component: CadastrarAreaPartnerComponent, canActivate: [AuthGuardService] },
  { path: 'area-partner/cadastrar', component: CadastrarAreaPartnerComponent, canActivate: [AuthGuardService] },

  { path: 'profissionais/cadastrar/:id', component: CadastrarProfissionalComponent, canActivate: [AuthGuardService] },
  { path: 'profissionais/cadastrar', component: CadastrarProfissionalComponent, canActivate: [AuthGuardService] },

  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuardService] },

  { path: 'clientes/cadastrar/:id', component: CadastrarClientesComponent, canActivate: [AuthGuardService] },
  { path: 'clientes/cadastrar', component: CadastrarClientesComponent, canActivate: [AuthGuardService] },

  { path: 'empresas', component: EmpresasComponent, canActivate: [AuthGuardService] },

  { path: 'empresas/cadastrar/:id', component: CadastrarEmpresaComponent, canActivate: [AuthGuardService] },
  { path: 'empresas/cadastrar', component: CadastrarEmpresaComponent, canActivate: [AuthGuardService] },

  { path: 'empresas/parceira', component: EmpresasParceiraComponent, canActivate: [AuthGuardService] },
  { path: 'empresas/parceira/cadastrar/:id', component: CadastrarEmpresaParceiraComponent, canActivate: [AuthGuardService] },
  { path: 'empresas/parceira/cadastrar', component: CadastrarEmpresaParceiraComponent, canActivate: [AuthGuardService] },

  { path: 'agendamentos', component: AgendamentosComponent, canActivate: [AuthGuardService] },
  { path: 'validar-codigo', component: ValidarCodigoComponent, canActivate: [AuthGuardService] },

  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuardService] },
  { path: 'configuracoes', component: ConfiguracoesComponent, canActivate: [AuthGuardService] },

  { path: 'transacoes', component: TransacoesComponent, canActivate: [AuthGuardService] },


  { path: 'ativar-usuario/:id', component: AtivarUsuarioComponent },
  { path: 'trocar-senha/:id', component: TrocarSenhaUsuarioComponent },

  { path: 'notificacoes', component: NotificacoesComponent },
  { path: 'chat', component: MensagensComponent },
  { path: 'pagamento', component: PagamentoComponent, canActivate: [AuthGuardService]  },
  { path: 'pagamento/cadastrar/:id', component: CadastrarPagamentoComponent, canActivate: [AuthGuardService]  },
  { path: 'pagamento/cadastrar', component: CadastrarPagamentoComponent, canActivate: [AuthGuardService]  },
  { path: '**', component: Error404Component }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
})

export class AppRoutingModule { }
