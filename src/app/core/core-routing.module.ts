import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoreComponent} from "./components/core/core.component";
import {ApprenantComponent} from "../components/apprenant/apprenant.component";
import {FormateurComponent} from "../components/formateur/formateur.component";

const routes: Routes = [
  {
    path : "", component : CoreComponent, children : [
      {
        path : "", loadChildren : ()=> import("./feature/student/student.module").then((m) => m.StudentModule)
      },
      { path: "app", component: ApprenantComponent, loadChildren: () => import("../components/apprenant/apprenant.module").then(m => m.ApprenantModule)},
      { path: "formateur", component: FormateurComponent, loadChildren: () => import("../components/formateur/formateur.module").then(m => m.FormateurModule) },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
