const express = require("express");
const router = express.Router();
const { UserRgster, userlogin, UsersAdd, GetAlluser, GetSingeluser, UpdateUser, DeleteUser, Searchuser } = require("../Controllers/UserControllers")
const VerifyToken = require("../middleware/Verifytoken")
const Image = require("../middleware/Imgupload");
const { Registration, Login, adduser } = require("../middleware/validation/Uservalidation");

router.post("/user", Registration, UserRgster);
router.post("/login", Login, userlogin);
router.post("/adduser", VerifyToken, Image.single("image"), adduser, UsersAdd);
router.get("/alluser", GetAlluser);
router.get("/singeluser/:id", VerifyToken, GetSingeluser);
router.put("/updateuser/:id", VerifyToken, Image.single("image"), UpdateUser);
router.delete("/deleteuser/:id", VerifyToken, DeleteUser)
router.get("/searchuser", Searchuser)


module.exports = router;

