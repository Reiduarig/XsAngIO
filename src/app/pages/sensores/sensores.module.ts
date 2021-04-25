import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SensoresPageRoutingModule } from './sensores-routing.module';
import { SensoresPage } from './sensores.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { DBMeter } from '@ionic-native/db-meter/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SensoresPageRoutingModule,
    ComponentsModule
  
  ],
  providers:[
    DBMeter
  ],
  declarations: [SensoresPage]
})
export class SensoresPageModule {}
