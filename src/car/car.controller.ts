import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CarType } from './car.model';
import { CarService } from './car.service';

@Controller()
export class CarController {
    constructor( private readonly carService: CarService ) {}

    @Post()
    async addCar(@Body() carToAdd: CarType): Promise<CarType> {

        const result: CarType = await this.carService.createNewCar(carToAdd);
        return result;
    }

    @Get(':id')
    async getSingleCar(@Param('id') id: string ): Promise<CarType> {

        const result: CarType = await this.carService.findCarById(id);
        return result
    }

    @Get()
    async findAll(): Promise<CarType[]> {

        const result: CarType[] = await this.carService.findAllListedCars();
        return result
    }

    @Put(':id')
    async updateCar(@Param('id') id: string, @Body() updateData: CarType): Promise<CarType>{

        const result: CarType = await this.carService.updateCarById(id, updateData);
        return result;
    }

    @Delete(':id')
    async deleteCar(@Param('id') id: string ): Promise<{msg: string}> {

        const result: { msg: string } = await this.carService.deleteCarById(id);
        return result
    }
}
