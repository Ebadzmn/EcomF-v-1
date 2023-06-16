const fs = require("fs");

const Product = require("../models/productM") ; 

const slugify = require ("slugify") ; 




exports.Pcreate = async (req,res) => {
    try {
        const  { name , description , price , category , quantity , shipping} = req.fields;

        const {photo} = req.files;

        if (!name.trim()) {
            return res.json ({error : " name is require"})
          };
          
          if (!description.trim()) { 
return res.json ({error : " description is required"})
          };


          if (!price.trim()) {
               return res.json({error : "Price is required"})
          };


          if ( !category.trim()) {
                return res.json ({error : " category is required"})
          };


          if (!quantity.trim()) {
            return res.json ({error : "quantity is required"})
          };

          if (!shipping.trim()) {
            return res.json ({error : "shipping is required"})
          };

          if ( photo && photo.size > 1000000) {
             return res.json ({error : "Image is required"})
          }


          const product = new Product ({...req.fields, slug: slugify(name)});


          if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
          }


          await product.save()
          res.json(product);





    } catch (error) {
        return res.status (400).json (error)
    }
};




exports.Plist = async (req,res) => {
  try {
    const product = await Product.find({})
    .populate("category")
    .select("-photo")
    .limit(12)
    .sort({createAt : -1});

    res.json(product);
  } catch (error) {
    console.log(error)
  }
}