import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email:{
            type: String,
            require:true,
            unique:true,
            trim:true,
            lowercase:true
        },
        password:{
            type: String,
            require:true,
            
        }, 
    }
)

const User = mongoose.model("user",userSchema)

export default User