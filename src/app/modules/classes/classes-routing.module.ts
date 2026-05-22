import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesListComponent } from './components/main/classes-list.component';

const routes: Routes = [{ path: '', component: ClassesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassesRoutingModule {}
