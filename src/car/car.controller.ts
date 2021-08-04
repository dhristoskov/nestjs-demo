import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

import { CarType } from './car.model';
import { CarService } from './car.service';

@Controller()
export class CarController {
    constructor( private readonly carService: CarService ) {}

    @Post()
    async addCar( @Res() res, @Body() carToAdd: CarType): Promise<{ car: CarType }> {

        const result: CarType = await this.carService.createNewCar(carToAdd);
        return res.status(HttpStatus.OK).json({ car: result });
    }

    @Get(':id')
    async getSingleCar( @Res() res, @Param('id') id: string ): Promise<{ car: CarType }> {

        const result: CarType = await this.carService.findCarById(id);
        return res.status(HttpStatus.OK).json({ car: result });
    }

    @Get()
    async findAll( @Res() res ): Promise<{ cars: CarType[] }> {

        const result: CarType[] = await this.carService.findAllListedCars();
        return res.status(HttpStatus.OK).json({ cars: result });
    }

    @Put(':id')
    async updateCar( @Res() res, @Param('id') id: string, @Body() updateData: CarType): Promise<{ car: CarType }>{

        const result: CarType = await this.carService.updateCarById(id, updateData);
        return res.status(HttpStatus.OK).json({ car: result });
    }

    @Delete(':id')
    async deleteCar( @Res() res, @Param('id') id: string ): Promise<{ msg: string }> {

        const result: { msg: string } = await this.carService.deleteCarById(id);
        return res.status(HttpStatus.OK).json( result );
    }
}
