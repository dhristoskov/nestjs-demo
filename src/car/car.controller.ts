import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Car, CarType } from './car.model';
import { CarService } from './car.service';

@Controller()
export class CarController {
    constructor( private readonly carService: CarService ) {}

    @Post()
    async addCar(@Body() carToAdd: CarType): Promise<Car> {

        const result = await this.carService.createNewCar(carToAdd);
        return result;
    }

    @Get(':id')
    async getSingleCar(@Param('id') id: string ): Promise<Car> {

        const result = await this.carService.findCarById(id);
        return result
    }

    @Get()
    async findAll(): Promise<Car[]> {

        const result = await this.carService.findAllListedCars();
        return result
    }

    @Put(':id')
    async updateCar(@Param('id') id: string, @Body() updateData: CarType): Promise<Car>{

        const result = await this.carService.updateCarById(id, updateData);
        return result;
    }

    @Delete(':id')
    async deleteCar(@Param('id') id: string ): Promise<{msg: string}> {

        const result = await this.carService.deleteCarById(id);
        return result
    }
}
