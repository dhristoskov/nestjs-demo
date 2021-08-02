import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Car {
    @Prop({ required: true })
    manufactorer: string;
    @Prop({ required: true })
    model: string;
    @Prop({ required: true, enum: [ 'Automatic', 'Manual' ], default: 'Manual'})
    gears: string;
    @Prop({ required: true })
    seats: number;
    @Prop({ required: true, enum: [ 'Yes', 'No' ], default: 'Yes' })
    clima: string;
    @Prop({ required: true })
    price: number;
    @Prop({ required: true })
    quantity: number;
}

export type CarType = Car & Document;
export const CarSchema = SchemaFactory.createForClass(Car);