import { Routes } from '@angular/router';
import { ApprenantComponent } from './components/apprenant/apprenant.component';
import { FormateurComponent } from './components/formateur/formateur.component';
import { authGuard } from './guard/auth.guard';


export const routes: Routes = [
 /* { path: "app", component: ApprenantComponent, loadChildren: () => import("./components/apprenant/apprenant.module").then(m => m.ApprenantModule),canActivate : [authGuard] },
  { path: "formateur", component: FormateurComponent, loadChildren: () => import("./components/formateur/formateur.module").then(m => m.FormateurModule), canActivate : [authGuard] },
  { path: "", loadChildren: () => import("./components/auth/auth.module").then(m => m.AuthModule) },
*/
  {
    path: 'auth', loadChildren : ()=> import("./auth/auth.module").then(m => m.AuthModule),
  },
  {
    path: '', loadChildren : ()=> import("./core/core.module").then(m => m.CoreModule),
  },
];
