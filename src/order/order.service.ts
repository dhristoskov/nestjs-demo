import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { CarType } from 'src/car/car.model';
import { OrderType } from './order.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Orders') private readonly Order: Model<OrderType>,
        @InjectModel('Cars') private readonly CarUnit: Model<CarType>,
        @InjectConnection() private readonly connection: Connection
        ) {}

    public async createNewOrder( carId: string, newOrder: OrderType ): Promise<OrderType> {
        
        const { daysRent, name } = newOrder;

        let carToRent: CarType;
        try {
            carToRent = await this.CarUnit.findById(carId).exec();
        }catch(err){
            throw new Error('There is a problem finding a car with that id')
        }

        if(!carToRent) {
            throw new Error('Car not found!')
        }

        /*Check if there is available car from that type*/
        if(carToRent.quantity <= 0){
            throw new Error('Car could not be rented!');
        }

        const order: OrderType = new this.Order({
            daysRent, 
            name, 
            totalPrice: this.calculateTotalPrice(daysRent, carToRent.price), 
            car: carToRent
        });

        /*Create session to save new Order and remove 
        one car from the available cars from the type*/
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

    public async findOrderById( id: string ): Promise<OrderType> {

        let orderById: OrderType;
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
        
        let orderToDelete: OrderType;
        try {
            orderToDelete = await this.Order.findById(id).exec()
        }catch(err){
            throw new Error('Order could not be found!');
        }

        if(!orderToDelete){
            throw new Error('Order with that id does not exist');
        }

        /*Create session to add one car to
        the car type when the order is deleted*/
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

    /*Calculate different offers for long rent*/
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
