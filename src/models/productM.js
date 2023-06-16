const mongoose = require ("mongoose")

const {ObjectId} = mongoose.Schema


const ProductSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            trim: true,
            required : true,
            
        },


        slug : {
            type : String,
        },


        description : {
            type : String,
            required : true ,
        },


        price : {
            type : Number,
            required : true,
            trim : true,
        },

        category : {
            type : ObjectId,
            ref : "Category",
            required : true,
        },

      quantity : {
        type : Number,
      },

      sold : {
        type : Number,
        default : 0
      }, 


      photo : {
        data : Buffer,
        contentType : String,
      },


      shipping : {
        required : false,
        type : Boolean,
      },

    },

    {timestamps : true , versionKey : false}
);

const Product = mongoose.model ("Product" , ProductSchema);

module.exports = Product;