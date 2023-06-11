const express = require ("express")
const router = express.Router();

const {requireSignin, isAdmin} = require ("../middleware/auth.js")

const {register,login , secret , updateProfile} = require ("../controller/userctr.js")

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


module.exports = router ; 