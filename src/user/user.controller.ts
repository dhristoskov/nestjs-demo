import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { UserType } from './user.model';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
    constructor( private readonly userService: UserService ){}

    @Post('register')
    async register( @Res() res, @Body() user: UserType ){
       console.log(user);
       return res.status(HttpStatus.OK).json({ msg: "return" })
    }

    @Post('login')
    async loginIn( @Res() res, @Body() user: UserType ){
        console.log(user);
        return res.status(HttpStatus.OK).json({ msg: "return" })
    }
}
