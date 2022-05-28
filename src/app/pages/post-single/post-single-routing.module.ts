import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostSinglePage } from './post-single.page';

const routes: Routes = [
  {
    path: '',
    component: PostSinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostSinglePageRoutingModule {}
