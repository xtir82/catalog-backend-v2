import {Schema,model} from "mongoose";

const userSchema = new Schema({
    first_name: {type: String, required:true},
    last_name: {type: String/*, required:true*/},
    age: {type: Number/*, required:true*/},
    email: {type: String, required:true, index:true, unique:true},
    password: {type: String/*, required:true*/},
    cart: {type: String},
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

const UserModel = model("users", userSchema);
export default UserModel;