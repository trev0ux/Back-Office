import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarProfissionalComponent } from './cadastrar-profissional.component';

describe('CadastrarProfissionalComponent', () => {
  let component: CadastrarProfissionalComponent;
  let fixture: ComponentFixture<CadastrarProfissionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarProfissionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
