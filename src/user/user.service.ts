import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';

import { UserType } from './user.model';

@Injectable()
export class UserService {
    constructor (
        @InjectModel('Users') private readonly User: Model<UserType>,
        private readonly jwtService: JwtService
    ){}

    public async registerUser( user: UserType ) {

        const { username, password } = user;

        let userToSave: UserType;
        try {
            userToSave = await this.User.findOne({ username }).exec();
        }catch(err){
            throw new Error('User could not be created!');
        }

        if(userToSave){
            throw new Error('User already exist!')
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new this.User({
            username,
            password: hashedPassword,
            orders: []
        });

        try {
            await newUser.save();
        }catch(err){
            throw new Error('User could not be created!')
        }

        // return { token: this.jwtService.sign({ 
        //             username: newUser.username,  
        //             sub: newUser._id
        //         })
        //     };

        return newUser
    }

    public async LoginInUser( user: UserType ){
        console.log(user)
    }

    public async validateUser( username: string, password: string ): Promise<UserType> {

        const user = await this.User.findOne({ username }).exec();
    
        if (!user) {
            return null;
        }
    
        const valid = await bcrypt.compare(password, user.password);
    
        if (valid) {
            return user;
        }
    
        return null;
    }
}
