import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './components/tree/tree.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: TreeComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TreeComponent]
})
export class FractalModule { }
