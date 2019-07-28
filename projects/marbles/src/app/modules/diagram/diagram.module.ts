import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramComponent } from './components/diagram/diagram.component';
import { MarbleComponent } from './components/marble/marble.component';
import { OperatorComponent } from './components/operator/operator.component';
import { ErrorComponent } from './components/error/error.component';
import { EndComponent } from './components/end/end.component';
import { SourceBlockComponent } from './components/source-block/source-block.component';
import { OperatorBlockComponent } from './components/operator-block/operator-block.component';
import { DecodeSourcePipe } from './pipes/decode-source.pipe';
import { ShufflePipe } from './pipes/shuffle.pipe';



@NgModule({
  declarations: [
    DiagramComponent,
    MarbleComponent,
    OperatorComponent,
    ErrorComponent,
    EndComponent,
    SourceBlockComponent,
    OperatorBlockComponent,
    DecodeSourcePipe,
    ShufflePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DiagramComponent
  ]
})
export class DiagramModule { }
