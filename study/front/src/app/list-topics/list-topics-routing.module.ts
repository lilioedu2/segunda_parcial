import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTopicsPage } from './list-topics.page';

const routes: Routes = [
  {
    path: '',
    component: ListTopicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTopicsPageRoutingModule {}
