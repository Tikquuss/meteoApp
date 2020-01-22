import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HourlyWeeklyRoutingModule } from './hourly-weekly-routing.module';
import {HourlyComponent} from '../hourly/hourly.component';
import {WeeklyComponent} from '../weekly/weekly.component';
import {InterfaceMeteoComponent} from '../interface-meteo/interface-meteo.component';
import {ChangeLocationModalComponent} from '../change-location-modal/change-location-modal.component';
import {ChangeLocationModalContentComponent} from '../change-location-modal-content/change-location-modal-content.component';


@NgModule({
  declarations: [
    HourlyComponent,
    WeeklyComponent,
    InterfaceMeteoComponent,
    ChangeLocationModalComponent,
  ],
  imports: [
    CommonModule,
    HourlyWeeklyRoutingModule
  ]
})
export class HourlyWeeklyModule { }
