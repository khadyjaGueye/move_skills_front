import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { TestComponent } from "./test/test.component";


const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "inscription", component: RegisterComponent },
  { path: "register", component: TestComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AuthRoutingModule {

}
