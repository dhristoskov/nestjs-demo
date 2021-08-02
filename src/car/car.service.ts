import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order, OrderType } from 'src/order/order.model';
import { Car, CarType } from './car.model';

@Injectable()
export class CarService {
    constructor(
        @InjectModel('Orders') private readonly Order: Model<OrderType>,
        @InjectModel('Cars') private readonly CarUnit: Model<CarType>
        ) {}

    public async createNewCar( carToAdd: CarType ): Promise<Car> {
        
        const { manufactorer, model, gears, seats, clima, price, quantity } = carToAdd;

        try {
            const car: CarType = new this.CarUnit({
                manufactorer, 
                model, 
                gears, 
                seats, 
                clima, 
                price, 
                quantity
            })

            await car.save();
            return car;

        }catch(err){
            throw new Error('Creating new car entry failed')
        }
    }

    public async findCarById( id: string ): Promise<Car> {

        let carById: Car;
        try {
            carById = await this.CarUnit.findById(id).exec()
        }catch(err){
            throw new Error('Car could not be found!');
        }

        if(!carById){
            throw new Error('Car with that id does not exist');
        }

        return carById;
    }

    public async findAllListedCars(): Promise<Car[]> {

        let listedCars: Car[] = [];
        try {

            listedCars = await this.CarUnit.find({ quantity: { $gt: 0 } }).exec()
        }catch(err){
            throw new Error('There is a problem finding the car list')
        }

        if(listedCars.length <= 0 ){
            throw new Error('There is no car to be show');
        }

        return listedCars;
    }

    public async updateCarById( id: string, updateData: CarType ): Promise<Car>{

        const { manufactorer, model, gears, seats, clima, price, quantity } = updateData;

        let carToUpdate: Car;
        try {
            carToUpdate = await this.CarUnit.findById(id).exec()
        }catch(err){
            throw new Error('There is a problem finding that car!')
        }

        if(!carToUpdate){
            throw new Error('Car could not be found!')
        }

        try {
            const updatedCar = await this.CarUnit.findByIdAndUpdate(id, 
                {
                    manufactorer: manufactorer || carToUpdate.manufactorer,
                    model: model || carToUpdate.model, 
                    gears: gears || carToUpdate.gears, 
                    seats: seats || carToUpdate.seats, 
                    clima: clima || carToUpdate.clima, 
                    price: price || carToUpdate.price, 
                    quantity: quantity || carToUpdate.quantity
                }, { new: true, useFindAndModify: false });

                const newCar = await updatedCar.save();
                return newCar;
        }catch(err){
            throw new Error('There is a problem updating car data!')
        }
    }

    public async deleteCarById( id: string ): Promise<{ msg: string }>{
        
        let carToDelete: any;
        try {
            carToDelete = await this.CarUnit.findById(id).exec()
        }catch(err){
            throw new Error('Car could not be found!');
        }

        if(!carToDelete){
            throw new Error('Car with that id does not exist');
        }

        /*Check if the car is part of existing order
        And only if not, allow deletion */
        let availableOrders: Order[] = []
        try{
            availableOrders = await this.Order.find({ car: carToDelete._id })
        }catch(err){
            throw new Error('Orders list could not be found');
        }

        if(availableOrders){
            return { msg: 'This car could not be deleted!'}
        }

        try {
            await this.CarUnit.findByIdAndRemove(id, {useFindAndModify: false}).exec();
            return { msg: 'Car deleted!'}
        }catch(err){
            throw new Error('Car could not be deleted');
        }
    }
}
