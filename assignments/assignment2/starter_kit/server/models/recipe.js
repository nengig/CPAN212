import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
    {
        name:{
            type: String,
            require:true,
            unique:true,
            trim:true,
            uppercase:true
        },
        description:{
            type: String,
            require:true,
            lowercase:true
        }, 
        difficulty:{
            type: String,
            enum: ['Easy', 'Medium', 'Hard'], 
            require: true
        },
        ingredients: { 
            type: [String], 
            require: true 
        },
        steps: { 
            type: [String], 
            require: true 
        },
    }
)

const Recipe = mongoose.model("recipe",recipeSchema)

export default Recipe