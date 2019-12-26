import { TestBed, inject } from '@angular/core/testing';

import { FormaPagamentoService } from './forma-pagamento.service';

describe('FormaPagamentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormaPagamentoService]
    });
  });

  it('should be created', inject([FormaPagamentoService], (service: FormaPagamentoService) => {
    expect(service).toBeTruthy();
  }));
});
