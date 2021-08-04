import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { truncate } from "node:fs";

import { Car } from "src/car/car.model";

@Schema()
export class Order {
    @Prop({ type: Number, required: true })
    daysRent: number;
    @Prop({ type: String, required: true, minlength: 5 })
    name: string;
    @Prop({ type: String, required: true })
    totalPrice: number;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Car' })
    car: Car;
    @Prop({ type: Date, required: true, default: Date.now })
    startDate: Date
}

export type OrderType = Order & mongoose.Document;
export const OrderSchema = SchemaFactory.createForClass(Order);