import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCategoryProdutoComponent } from './cadastrar-category-produto.component';

describe('CadastrarCategoryProdutoComponent', () => {
  let component: CadastrarCategoryProdutoComponent;
  let fixture: ComponentFixture<CadastrarCategoryProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarCategoryProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarCategoryProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
