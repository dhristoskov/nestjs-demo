import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';

import { OrderType } from './order.model';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor( private readonly orderService: OrderService ) {}

    @Post(':id')
    async addOrder( @Res() res, @Param('id') id: string, @Body() order: OrderType): Promise<{ order: OrderType }>  {

        const result: OrderType = await this.orderService.createNewOrder(id, order);
        return res.status(HttpStatus.OK).json({ order: result });
    }

    @Get(':id')
    async getSingleOrder( @Res() res, @Param('id') id: string ): Promise<{ order: OrderType }> {

        const result: OrderType = await this.orderService.findOrderById(id);
        return res.status(HttpStatus.OK).json({ order: result });
    }

    @Delete(':id')
    async deleteCar( @Res() res, @Param('id') id: string ): Promise<{ msg: string }>  {

        const result: { msg: string } = await this.orderService.deleteOrderById(id);
        return res.status(HttpStatus.OK).json( result );
    }
}
