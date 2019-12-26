import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPlanoServicoComponent } from './cadastrar-plano-servico.component';

describe('CadastrarPlanoServicoComponent', () => {
  let component: CadastrarPlanoServicoComponent;
  let fixture: ComponentFixture<CadastrarPlanoServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPlanoServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPlanoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
