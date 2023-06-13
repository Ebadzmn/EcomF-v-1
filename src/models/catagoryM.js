const mongoose =  require ("mongoose")
var uniqueValidator = require('mongoose-unique-validator');


var categorySchema = new mongoose.Schema(
    {
        name : {
        type : String,
        trim: true,
        required :true,
        unique : true,
        index: true,
        },

        slug : {
            type : String,
            unique : true,
            lowercase : true,
        }
    }, { timestamps : true , versionKey : false}
)
categorySchema.plugin(uniqueValidator);


const Category = mongoose.model ("Category" , categorySchema)

module.exports = Category ;