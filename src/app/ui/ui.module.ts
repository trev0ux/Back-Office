import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, MenuComponent],
  imports: [
    CommonModule,
    NgbModule,
    AppRoutingModule 
  ],
  exports: [LayoutComponent]
})
export class UiModule { }
