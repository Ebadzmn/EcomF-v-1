const express = require ("express")
const router = express.Router();
const formidable = require("express-formidable");



//middleware
const {requireSignin, isAdmin} = require ("../middleware/auth.js")


//Profile
const {register,login , secret , updateProfile} = require ("../controller/userctr.js")


//category
const {create,update , removed, list, read} = require ("../controller/category.js")


//product
const {Pcreate,Plist,Pread , Pphoto, Premove, Pupdate} = require ("../controller/Product.js")




//login Section
router.post ("/register" , register)
router.post ("/login" , login)





//Profile SECTION
router.post ("/profileup" , requireSignin, updateProfile)
router.get ("/auth" , requireSignin , (req,res) => {
    res.json ({ok:true})
} )
router.get ("/admin" , requireSignin, isAdmin , (req,res) => {
    res.json ({ok:true})
} )
router.get("/secret", requireSignin, isAdmin, secret);





//Category Section
router.post ("/category" , requireSignin , isAdmin , create)
router.put ("/category/:categoryId" , requireSignin , isAdmin , update)
router.delete ("/category/:categoryId" , requireSignin , isAdmin , removed)
router.get ("/category" , requireSignin , list)
router.get ("/category/:slug" , requireSignin , isAdmin , read)


//Product Section

router.post("/product", requireSignin, isAdmin, formidable(), Pcreate);
router.get("/product" ,Plist)
router.get("/product/:slug" , Pread)

router.get("/product/photo/:productId" , Pphoto)
router.delete("/product/:productId", requireSignin,isAdmin , Premove)
router.put("/product/:productId", requireSignin, isAdmin, formidable(), Pupdate)

module.exports = router ; 