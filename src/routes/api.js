const express = require ("express")
const router = express.Router();

const {requireSignin} = require ("../middleware/auth.js")

const {register,login} = require ("../controller/userctr.js")

router.post ("/register" , register)
router.post ("/login" , login)

router.get ("/auth" , requireSignin , (req,res) => {
    res.json ({ok:true})
} )

module.exports = router ; 