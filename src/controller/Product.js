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








    exports.filterProduct = async (req,res) => {
      try {
        const {checked,radio} = req.body;
    
        let args = {};
        if ( checked.length > 0) args.category = checked;
        if (radio.length) args.price = {$gte: radio[0], $lte: radio[1]};
      const product = await Product.find(args);
      res.json(product);
        }
    
    
        
     catch (error) {
        console.log(error)
      }
    };



  exports.productcount = async (req,res) => {
    try {
      const product = await Product.countDocuments();
      res.json(product);
    } catch (error) {
      console.log(error)
    }
  }


  exports.listProductPage = async (req,res) => {
    try {
      const perPage =2;
      const page =  req.params.page ? req.params.page : 1;
      const skip = (page - 1) * perPage;
      const product = await Product.find().select("-photo").skip(skip).limit(perPage);
      res.json(product);
    } catch (error) {
      return res.status(400).json(error)
    }
  }


  
  exports.productsSearch = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ],
        }).select("-photo");

        res.json(results);
    } catch (err) {
        console.log(err);
    }
};

exports.relatedProduct = async (req,res) => {
  try {
    const {productId,categoryId} = req.params;
    const related = await Product.find({ category: categoryId,
      _id: {$ne: productId},
    })
    .select("-photo")
    .populate("category")
    .limit(3);
    res.json(related);
  } catch (error) {
    return res.status(400).json(error)
  }
}