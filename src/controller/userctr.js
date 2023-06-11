
const User = require('../models/usermodel'); // Import the User model
const jwt = require('jsonwebtoken'); // Import the jwt module


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }

    if (!email) {
      return res.json({ error: "Email is required" });
    }

    if (!password || password.length < 8) {
      return res.json({ error: "Password must be at least 8 characters" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ error: "Email is already taken" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};






exports.login = async (req,res) => {
  try {
    const {email,password} = req.body;
    if (!email) {
      return res.json ({
        error : "email required"
      })
    }

    if(!password || password < 6) {
           return res.json ({error : "must 8 word"})
    }

    const user = await User.findOne({email});

    if(!user) {

      return res.json ({error : " user not found"})

    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
  });

          // 7. send response
          res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token,
        });





  } catch (error) {
    
  }
}



exports.secret = async (req, res) => {
  console.log(req.user);
  res.json({
      currentUser: req.user,
      message: "admin successfully entered in the controller"
  });
};




exports.updateProfile = async (req,res) => {
try {
  const {name,password} = req.body;

  const user = await User.findById(req.body._id);

if (password && password.length < 6) {
  return res.json ({error : "password must be 6 upper"})
}



const update = await User.findByIdAndUpdate (
  req.user._id,

  {
    name: name || user.name,
    password : password || user.password
    // address : address || user.address,
     
  },
  {new:true}
)

update.password = undefined;
update.role = undefined;
res.json(update)

} catch (error) {
    console.log(error)
}
}