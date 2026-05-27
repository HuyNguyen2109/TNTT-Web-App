import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenListComponent } from './components/main/children-list.component';

const routes: Routes = [{ path: '', component: ChildrenListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildrenRoutingModule {}
