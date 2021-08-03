import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { OrderType } from './order.model';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor( private readonly orderService: OrderService ) {}


    @Post(':id')
    async addOrder(@Param('id') id: string, @Body() order: OrderType): Promise<OrderType> {

        const result = await this.orderService.createNewOrder(id, order);
        return result
    }

    @Get(':id')
    async getSingleOrder(@Param('id') id: string ): Promise<OrderType> {

        const result = await this.orderService.findOrderById(id);
        return result
    }

    @Delete(':id')
    async deleteCar(@Param('id') id: string ): Promise<{msg: string}> {

        const result = await this.orderService.deleteOrderById(id);
        return result
    }
}
