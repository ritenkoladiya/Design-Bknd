const express = require("express");
const router = express.Router();
const { Addcategory, Addsubcategory, getsubCategory, getallcategory, getsubcategory, SuballCategory, Deletecategory, Updatecategory, DeleteSubcategory, Updatesubcategory, getmaincategory, getsingelcategory, getsingelsubcategory,
    Addproduct, allproduct, Deleteproduct, Productupdate, Singelproduct, Searchproduct, ExportProduct } = require("../Controllers/ProductControllers");
const Image = require("../middleware/Imgupload");

router.post("/addcategory", Addcategory);
router.post("/addsubcategory", Addsubcategory);
router.get("/category", getsubCategory);
router.get("/allcategory", getallcategory);
router.get("/getsubcategory/:category_id", getsubcategory);
router.get("/subcategory", SuballCategory)
router.delete("/deletecategory/:id", Deletecategory);
router.put("/updatecategory/:id", Updatecategory);
router.delete("/deletesubcategory/:id", DeleteSubcategory);
router.put("/updatesubcategory/:id", Updatesubcategory);
router.get("/maincategory", getmaincategory)
router.get("/singelcategory/:id", getsingelcategory);
router.get("/singelsubcategory/:id", getsingelsubcategory)

router.post("/addproduct", Image.single("image"), Addproduct);
router.get("/allproduct", allproduct);
router.delete("/deleteproduct/:id", Deleteproduct);
router.put("/productupdate/:id", Image.single("image"), Productupdate);
router.get("/singelproduct/:id", Singelproduct);
router.get("/searchproduct", Searchproduct);
router.get("/export", ExportProduct);

module.exports = router;
