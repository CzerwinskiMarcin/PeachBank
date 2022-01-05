import { NgModule } from '@angular/core';
import { InputComponent } from './components/input/input.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';

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
