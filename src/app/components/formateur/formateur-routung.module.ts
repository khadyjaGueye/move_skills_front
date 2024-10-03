import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { ListParcoursComponent } from "./list-parcours/list-parcours.component";

const routes: Routes = [
   { path: "list", component: ListParcoursComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class FormateurRoutingModule {

}
