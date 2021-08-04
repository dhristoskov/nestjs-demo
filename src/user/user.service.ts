import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OrderType } from 'src/order/order.model';
import { UserType } from './user.model';

@Injectable()
export class UserService {
    constructor (
        @InjectModel('Orders') private readonly Order: Model<OrderType>,
        @InjectModel('Users') private readonly User: Model<UserType>
    ){}

    public async registerUser( user: UserType ) {
        //
    }

    public async LoginIn( user: UserType ){
        //
    }
}
