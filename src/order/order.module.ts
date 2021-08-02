import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CarSchema } from 'src/car/car.model';
import { OrderController } from './order.controller';
import { OrderSchema } from './order.model';
import { OrderService } from './order.service';

@Module({
  imports: [ 
    MongooseModule.forFeature([{
        name: 'Orders', schema: OrderSchema
    }]),
    MongooseModule.forFeature([{
      name: 'Cars', schema: CarSchema
    }])
],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
