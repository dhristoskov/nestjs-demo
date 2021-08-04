import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderSchema } from 'src/order/order.model';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'Users', schema: UserSchema
        }]),
        MongooseModule.forFeature([{
            name: 'Orders', schema: OrderSchema
        }]),
    ],
    controllers: [ UserController ],
    providers: [ UserService ] 
})

export class UserModule {}
