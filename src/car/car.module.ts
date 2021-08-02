import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderSchema } from 'src/order/order.model';
import { CarController } from './car.controller';
import { CarSchema } from './car.model';
import { CarService } from './car.service';

@Module({
    imports: [ 
        MongooseModule.forFeature([{
            name: 'Orders', schema: OrderSchema
        }]),
        MongooseModule.forFeature([{
            name: 'Cars', schema: CarSchema
    }])],
    controllers: [CarController],
    providers: [ CarService]
})
export class CarModule {}
