import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent, CardComponent } from './components';

const COMPONENTS = [
  InputComponent,
  CardComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SharedModule {}
