const mongoose = require ("mongoose")

const {Schema} = mongoose

const UserSchema = new Schema(
    {
     name: {
          type: String,
          trim : true,
          require : true,
     },

     email : {
        type: String,
        trim : true,
        require : true,
        unique : true,
     },
     password : {
        type: String,
        trim : true,
        require : true,
        min : 6,
        max : 32,
     },

     address: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        default: 0,
    } 
    }
     , 
     
     {timestamps : true , versionKey : false}
)

const UserModel = mongoose.model ("User" , UserSchema)
module.exports = UserModel;