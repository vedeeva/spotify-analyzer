import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { AuthComponent } from './auth/auth.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';

const routes: Routes = [
  { path: 'radar', component: RadarChartComponent, runGuardsAndResolvers: 'always'},
  { path: 'oauth/callback', component: AuthComponent },
  { path: 'bar', component: BarChartComponent, runGuardsAndResolvers: 'always'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
