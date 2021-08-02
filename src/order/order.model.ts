import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

import { Car } from "src/car/car.model";

@Schema()
export class Order {
    @Prop({ required: true })
    daysRent: number;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    totalPrice: number;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Car' })
    car: Car;
    @Prop({ required: true, default: Date.now })
    startDate: Date
}

export type OrderType = Order & mongoose.Document;
export const OrderSchema = SchemaFactory.createForClass(Order);