import { Routes } from '@angular/router';
import { ApprenantComponent } from './components/apprenant/apprenant.component';
import { FormateurComponent } from './components/formateur/formateur.component';


export const routes: Routes = [
  { path: "app", component: ApprenantComponent, loadChildren: () => import("./components/apprenant/apprenant.module").then(m => m.ApprenantModule) },
  { path: "formateur", component: FormateurComponent, loadChildren: () => import("./components/formateur/formateur.module").then(m => m.FormateurModule) },
  { path: "", loadChildren: () => import("./components/auth/auth.module").then(m => m.AuthModule) },

];
