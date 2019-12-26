import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPlanoCategoriaComponent } from './cadastrar-plano-categoria.component';

describe('CadastrarPlanoCategoriaComponent', () => {
  let component: CadastrarPlanoCategoriaComponent;
  let fixture: ComponentFixture<CadastrarPlanoCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPlanoCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPlanoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
