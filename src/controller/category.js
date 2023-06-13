const Category = require ("../models/catagoryM.js")

const slugify = require ("slugify");


exports.create = async (req,res) => {

    try {
        const {name} = req.body;
        
        if (!name.trim()) {
          return res.json ({error : " name is require"})
        };
        
        const existingCategory = await Category.findOne({name});

        if ( existingCategory) {
               return res.json ({error : "Already exist"})
        }

       const category = await new Category ({name, slug: slugify(name)})

      res.json (category)
       category.save();

    } catch (error) {
            return res.status (400).json (error)       
    }
};


exports.update = async (req,res) => {

  try {
    const {name} =req.body;
     const {categoryId} = req.params;
     const category = await Category.findByIdAndUpdate (
      categoryId,
      {
        name,
        slug: slugify(name)
      },
      {new:true}
     );
     res.json(category);



  } catch (error) {
    return res.status(400).json (error)
  }
}



exports.removed =async (req,res) => {
  try {
    const {categoryId} = req.params;
     const remove = await Category.findByIdAndDelete(categoryId)
     res.json (remove)
  } catch (error) {
    return res.status(400).json (error)
  }
}


exports.list = async (req,res) => {
try {
  const all = await Category.find({});
  res.json(all)
} catch (error) {
  return res.status(400).json (error)
}
}

exports.read = async (req, res) => {
  try {
      const category = await Category.findOne({ slug: req.params.slug });
      res.json(category);
  } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);
  }
};