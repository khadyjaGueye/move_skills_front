import { RouterModule, Routes } from "@angular/router";
import { ApprenantComponent } from "./apprenant.component";
import { NgModule } from "@angular/core";
import { FormComponent } from "./form/form.component";
import { ListComponent } from "./list/list.component";
import { QuizComponent } from "./quiz/quiz.component";

const routes: Routes = [
  { path: "", component: ApprenantComponent },
  { path: "form", component: FormComponent },
  { path: "list", component: ListComponent },
  { path: "quiz", component: QuizComponent },
  {path : "**", redirectTo : ""}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class ApprenantRoutingModule {

}
