import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

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
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: 1 }
        })
    ],
    controllers: [ UserController ],
    providers: [ UserService ] 
})

export class UserModule {}
