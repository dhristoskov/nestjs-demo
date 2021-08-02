import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Car, CarType } from 'src/car/car.model';
import { Order, OrderType } from './order.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Orders') private readonly Order: Model<OrderType>,
        @InjectModel('Cars') private readonly CarUnit: Model<CarType>,
        @InjectConnection() private readonly connection: Connection
        ) {}

    public async createNewOrder( carId: string, newOrder: OrderType ): Promise<Order> {
        
        const { daysRent, name } = newOrder;

        let carToRent: Car;
        try {
            carToRent = await this.CarUnit.findById(carId);
        }catch(err){
            throw new Error('There is a problem finding a car with that id')
        }

        if(!carToRent) {
            throw new Error('Car not found!')
        }

        if(carToRent.quantity <= 0){
            throw new Error('Car could not be rented!');
        }

        const order: OrderType = new this.Order({
            daysRent, 
            name, 
            totalPrice: this.calculateTotalPrice(daysRent, carToRent.price), 
            car: carToRent
        });

        const session = await this.connection.startSession();
        try {         
            session.startTransaction();
            await order.save({ session: session });         
            const car = await this.CarUnit.findById(order.car).exec();
            car.quantity = car.quantity - 1;
            await car.save({ session: session });
            await session.commitTransaction();
        }catch(err){
            session.abortTransaction();
            throw new Error('Creating new order failed');
        }finally {
            session.endSession();
        }

        return order;
    }

    public async findOrderById( id: string ): Promise<Order> {

        let orderById: Order;
        try {
            orderById = await this.Order.findById(id).exec()
        }catch(err){
            throw new Error('Order could not be found!');
        }

        if(!orderById){
            throw new Error('Order with that id does not exist');
        }

        return orderById;
    }

    public async deleteOrderById( id: string ): Promise<{ msg: string }>{
        
        let orderToDelete: Order;
        try {
            orderToDelete = await this.Order.findById(id).exec()
        }catch(err){
            throw new Error('Order could not be found!');
        }

        if(!orderToDelete){
            throw new Error('Order with that id does not exist');
        }

        const session = await this.connection.startSession();
        try {
            session.startTransaction();
            await this.Order.findByIdAndRemove(id, {useFindAndModify: false}).exec();
            const car = await this.CarUnit.findById(orderToDelete.car).exec();
            car.quantity = car.quantity + 1;
            await car.save({ session: session });
            await session.commitTransaction();           
        }catch(err){
            session.abortTransaction();
            throw new Error('Order could not be deleted');        
        }finally {
            session.endSession();
        }

        return { msg: 'Order deleted!'}
    }

    private calculateTotalPrice(days: number, rent: number): number {
        
        const total: number = days * rent;

        if (days >= 5 && days <= 10) {
            return +((80/ 100) * total).toFixed(2) 
        }

        if ( days > 10 ) {
            return +((60/ 100) * total).toFixed(2)
        }

        return total;
    }
}
