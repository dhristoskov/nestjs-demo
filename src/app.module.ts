import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CarModule } from './car/car.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    CarModule, 
    OrderModule,
    MongooseModule.forRoot('mongodb+srv://dimitar_hristoskov:QWiG2hMqyncSyK5S@cluster0.ghk0w.mongodb.net/NestJS?retryWrites=true&w=majority')   
  ],
})
export class AppModule {}
