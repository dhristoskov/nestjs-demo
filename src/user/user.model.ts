import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema()
export class User {
    @Prop({ type: String, required: true, unique: true, minlength: 5})
    username: string;
    @Prop({ type: String, required: true, minlength: 8 })
    password: string;
}

export type UserType = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);