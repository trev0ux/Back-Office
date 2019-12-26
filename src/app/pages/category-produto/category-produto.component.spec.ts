import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProdutoComponent } from './category-produto.component';

describe('CategoryProdutoComponent', () => {
  let component: CategoryProdutoComponent;
  let fixture: ComponentFixture<CategoryProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
