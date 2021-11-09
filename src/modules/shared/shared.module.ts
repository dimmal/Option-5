import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslatePipe } from './pipes/translation.pipe';

@NgModule({
  declarations: [    
    TranslatePipe
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    TranslatePipe,
  ]
})
export class SharedModule { }
