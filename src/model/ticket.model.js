import {Schema,model} from "mongoose";

const ticketSchema = new Schema({
    first_name: {type:String, required:true},
    last_name: {type:String/*, required:true*/},
    age: {type:Number/*, required:true*/},
    email: {type:String, required:true, index:true, unique:true},
    password: {type:String/*, required:true*/},
    cart: {type:String},
    role: {type:String}
})

const TicketModel = model("tickets", ticketSchema);
export default TicketModel;