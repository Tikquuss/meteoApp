import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InterfaceMeteoComponent} from '../interface-meteo/interface-meteo.component';
import {HourlyComponent} from '../hourly/hourly.component';
import {WeeklyComponent} from '../weekly/weekly.component';


const routes: Routes = [
  { path: '',
    component: InterfaceMeteoComponent,
    children: [
      { path: '', component: HourlyComponent },
      { path: 'weekly', component: WeeklyComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HourlyWeeklyRoutingModule { }
