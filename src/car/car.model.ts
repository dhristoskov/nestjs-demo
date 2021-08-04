import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Car {
    @Prop({ type: String, required: true })
    manufacturer: string;
    @Prop({ type: String, required: true })
    model: string;
    @Prop({ type: String, required: true, enum: [ 'Automatic', 'Manual' ], default: 'Manual'})
    gears: string;
    @Prop({ type: Number, required: true })
    seats: number;
    @Prop({ type: String, required: true, enum: [ 'Yes', 'No' ], default: 'Yes' })
    clima: string;
    @Prop({ type: Number, required: true })
    price: number;
    @Prop({ type: Number, required: true })
    quantity: number;
}

export type CarType = Car & Document;
export const CarSchema = SchemaFactory.createForClass(Car);