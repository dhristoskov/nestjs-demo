import { Body, Controller, Post } from '@nestjs/common';

import { UserType } from './user.model';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
    constructor( private readonly userService: UserService ){}

    @Post('register')
    async register(@Body() user: UserType ){
       console.log(user);
    }

    @Post('login')
    async loginIn(@Body() user: UserType ){
        console.log(user);
    }
}
