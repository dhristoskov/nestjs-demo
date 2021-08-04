import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { CarModule } from './car/car.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CarModule, 
    OrderModule,
    UserModule,
    MongooseModule.forRoot('mongodb+srv://dimitar_hristoskov:QWiG2hMqyncSyK5S@cluster0.ghk0w.mongodb.net/NestJS?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
})

export class AppModule {}
