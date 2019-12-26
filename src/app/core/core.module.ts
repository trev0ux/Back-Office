import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CNPJPipe } from './pipes/cnpj-pipe';
import { CPFPipe } from './pipes/cpf-pipe';
import { TelefonePipe } from './pipes/telefone-pipe';

@NgModule({
  declarations: [
    CPFPipe,
    CNPJPipe,
    TelefonePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  exports: [CPFPipe, CNPJPipe, TelefonePipe],
  bootstrap: []
})
export class CoreModule { }
