import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game.PAGE/game.component';
import { PageNotFoundComponent } from './components/page-not-found.PAGE/page-not-found.component';
import { SetupComponent } from './components/setup.PAGE/setup.component';
import { LoadInComponent } from './components/load-in.PAGE/load-in.component';


const routes: Routes = [
  {path:'', redirectTo:'/setup', pathMatch:'full'},
  {path:'loadin', component: LoadInComponent},
  {path:'setup', component: SetupComponent},
  {path:'game', component: GameComponent},
  {path:'**' , component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
