import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ],
})
export class CartModule { }
