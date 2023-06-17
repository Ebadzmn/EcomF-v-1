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
};







exports.Pread = async (req,res) => {
  try {
    const product = await Product.findOne({slug: req.params.slug})
    .select("-photo")
    .populate("category");
    res.json(product)

  } catch (error) {
    return res.status (400).json (error)
  }
}






exports.Pphoto = async (req,res) => {
  try {
    const product = await Product.findById(req.params.productId)
    .select("photo");
    if(product.photo.data) {
      res.set("Content-type" , product.photo.contentType);
      res.set("Cross-Origin-Resource-Policy", "cross-origin")
      return res.send(product.photo.data);
    }

  } catch (error) {
    console.log(error)
  }
};



exports.Premove = async (req,res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId)
    .select("-photo");
    res.json(({Msg : "Delete Done" , deletedProduct: product}));
  } catch (error) {
    console.log(error)
  }
}






exports.Pupdate = async (req,res) => {
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
        
        const product = await Product.findByIdAndUpdate(req.params.productId,{
          ...req.fields,
          slug: slugify(name),
        },
        {new:true})

        if (photo) {
          product.photo.data = fs.readFileSync(photo.path);
          product.photo.contentType = photo.type;
      }

      await product.save();
      res.json(product)



      }

      catch(error) {
      return res.status(400).json(error)
      }
    }
