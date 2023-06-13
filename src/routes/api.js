const express = require ("express")
const router = express.Router();

const {requireSignin, isAdmin} = require ("../middleware/auth.js")

const {register,login , secret , updateProfile} = require ("../controller/userctr.js")


const {create,update , removed, list, read} = require ("../controller/category.js")

router.post ("/register" , register)
router.post ("/login" , login)




router.post ("/profileup" , requireSignin, updateProfile)

router.get ("/auth" , requireSignin , (req,res) => {
    res.json ({ok:true})
} )


router.get ("/admin" , requireSignin, isAdmin , (req,res) => {
    res.json ({ok:true})
} )

router.get("/secret", requireSignin, isAdmin, secret);


router.post ("/category" , requireSignin , isAdmin , create)
router.put ("/category/:categoryId" , requireSignin , isAdmin , update)
router.delete ("/category/:categoryId" , requireSignin , isAdmin , removed)
router.get ("/category" , requireSignin , list)

router.get ("/category/:slug" , requireSignin , isAdmin , read)

module.exports = router ; 