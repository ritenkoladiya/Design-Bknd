const { Op } = require("sequelize");
const db = require("../Config sequelize");
const fs = require('fs');
const path = require("path");
const xlsx = require('xlsx');

const cty = db.Cty;
const SubCty = db.SubCty;
const product = db.product;

const Addcategory = async (req, resp) => {
    const { category } = req.body;
    // console.log("first------------------------------", req.body)
    try {

        const ctyadd = await cty.findOne({ where: { category } });
        // if (!ctyadd) {
        //     return resp.status(404).send({ message: "Filed Required" });
        // }
        // else 
        if (ctyadd) {
            return resp.status(400).send({ message: "Category already exists" })
        }

        const categoryadd = await cty.create({ category })
        resp.status(200).send({ data: categoryadd, message: "Category add succesfully" })

    } catch {
        resp.status(500).send({ message: 'Internal server error' })
    }
}

const Addsubcategory = async (req, resp) => {
    const { category, category_id } = req.body;
    console.log("first+----------", req.body)
    try {
        const subctyadd = await SubCty.findOne({ where: { category } });

        if (subctyadd) {
            return resp.status(400).send({ message: "Category already exists" })
        } else {
            const subcategoryadd = await SubCty.create({ category, category_id })
            resp.status(200).send({ data: subcategoryadd, message: "SubCategory add succesfully" })
        }
    } catch {
        resp.status(500).send({ message: 'Internal server error' })
    }
}

const getsubcategory = async (req, resp) => {
    const { category_id } = req.params;
    try {
        const subcategory = await SubCty.findAll({ where: { category_id } });
        resp.status(200).send(subcategory)
    } catch {
        resp.status(500).send({ message: 'Internal server error' })
    }
}

const getsubCategory = async (req, resp) => {
    try {
        let data = await cty.findAll({
            include: [{
                model: SubCty,
                include: [{
                    model: cty,
                }]
            }],
            where: { id: 3 }
        })
        console.log("first+-++-+++++----", data)
        resp.status(200).send({ data: data })
    } catch {
        resp.status(500).send({ message: 'Internal server error' })
    }
}

const getmaincategory = async (req, resp) => {
    const maincategory = await SubCty.findAll({
        // attributes: ["category"],
        include: [{
            model: cty,
            as: "category_detail",
            attributes: ["id", "category"]
        }]
    })

    resp.status(200).send({ data: maincategory })
}

const getallcategory = async (req, resp) => {
    try {
        const ctylength = await cty.findAll({});
        const { page = 1, limit = 10 } = req.query; // default to page 1 and limit of 10
        const offset = (page - 1) * limit; // calculate the offset
        const allcategory = await cty.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        if (allcategory) {
            resp.send({
                success: true,
                message: "Category found successfully!",
                datalength: ctylength.length,
                data: allcategory
            });
        } else {
            resp.send({
                success: false,
                message: "Category not found!",
                data: []
            });
        }
    } catch {
        resp.status(500).send({ message: 'Internal server error' })
    }
}

const SuballCategory = async (req, resp) => {
    try {
        const subctylength = await SubCty.findAll({})
        const { page = 1, limit = 10 } = req.query; // default to page 1 and limit of 10
        const offset = (page - 1) * limit; // calculate the offset
        const Allsubcategory = await SubCty.findAll({
            include: [{
                model: cty,
                as: "category_detail",
                attributes: ["id", "category"]
            }],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        if (Allsubcategory) {
            resp.send({
                success: true,
                message: "Category found successfully!",
                datalength: subctylength.length,
                data: Allsubcategory
            });
        } else {
            resp.send({
                success: false,
                message: "Category not found!",
                data: []
            });
        }
    } catch {
        resp.status(500).send({ message: 'Internal server error' })
    }
}

const Deletecategory = async (req, resp) => {
    const { id, category_id } = req.params;

    try {
        const categoryid = await cty.findOne({ where: { id } })
        if (!categoryid) {
            return resp.status(404).send({ message: "Category not found" })
        } else {
            if (categoryid) {
                await cty.destroy({ where: { id } });
                await SubCty.destroy({ where: { category_id: categoryid.id } })
                return resp.status(200).send({ message: 'Category deleted successfully' });
            }
        }
    } catch {
        resp.status(500).send({ message: 'Internal server error' })
    }
}

const Updatecategory = async (req, resp) => {
    const { id } = req.params;
    const { category } = req.body;

    try {
        const ctyid = await cty.findByPk(id);
        const ctys = await cty.findOne({ where: { id } });

        if (!ctys) {
            return resp.status(404).send({ message: "Category Not Found" })
        }
        else {
            const existingCty = await cty.findAll({
                where: {
                    [Op.and]: [
                        { category: { [Op.eq]: category } },
                        { id: { [Op.ne]: id } },
                    ],
                },
            });

            if (existingCty.length > 0) {
                return resp.status(400).send({ message: "Category already exists" });
            }

            ctyid.category = category;
            console.log("first----------", ctyid)
            await ctyid.save();

            resp.status(200).send({ ctyid, message: "Category successfully Update" })
        }
    } catch {
        resp.status(500).send({ message: "Internal server error" })
    }

}

const getsingelcategory = async (req, resp) => {
    const { id } = req.params;

    try {
        const singelcategory = await cty.findOne({ where: { id } });

        if (!singelcategory) {
            return resp.status(404).send({ message: "category not found" });
        } else if (singelcategory) {
            return resp.status(200).send({ singelcategory })
        }
    } catch {
        resp.status(500).send({ message: "Internal server error" })
    }
}

const getsingelsubcategory = async (req, resp) => {
    const { id } = req.params;

    try {
        const subcategory = await SubCty.findOne({
            where: { id },
            include: [{
                model: cty,
                as: "category_detail",
                attributes: ["id", "category"]
            }]
        });

        if (!subcategory) {
            return resp.status(404).send({ message: "subcategory not found" });
        } else if (subcategory) {
            return resp.status(200).send({ subcategory })
        }
    } catch {
        resp.status(500).send({ message: "Internal server error" })
    }
}

const DeleteSubcategory = async (req, resp) => {
    const { id } = req.params;

    try {
        const subcategoryid = await SubCty.findOne({ where: { id } })
        if (!subcategoryid) {
            return resp.status(404).send({ message: "Subcategory Not Found" });
        }
        else {
            if (subcategoryid) {
                await SubCty.destroy({ where: { id } });
                return resp.status(200).send({ message: "Subcategory Deleted Successfully" })
            }
        }
    } catch {
        resp.status(500).send({ message: "Internal server error" })
    }
}

const Updatesubcategory = async (req, resp) => {
    const { id } = req.params;
    const { category, category_id } = req.body;
    console.log("first----", req.body)


    try {
        const subctys = await SubCty.findOne({ where: { id } });

        if (!subctys) {
            return resp.status(404).send({ message: "Subcategory Not Found" });
        }
        else {

            const existingCty = await SubCty.findAll({
                where: {
                    [Op.and]: [
                        { category: { [Op.eq]: category } },
                        { id: { [Op.ne]: id } },
                    ],
                },
            });

            if (existingCty.length > 0) {
                return resp.status(400).send({ message: "Category already exists" });
            }

            subctys.category = category;
            subctys.category_id = category_id;

            await subctys.save();

            resp.status(200).send({ subctys, message: "Subcategory Successfully Update" })
        }

    } catch {
        resp.status(500).send({ message: "Internal server error" })
    }
}

const Addproduct = async (req, resp) => {
    const { productname, category, subcategory, price, Description, quantity, Inventory, Redeemable, Count } = req.body;
    console.log("------------", req.file)
    try {
        if (!productname || !category || !subcategory || !price || !Description || !Inventory || !Redeemable || !Count || !quantity) {
            return resp.status(409).send({ message: 'All filed required' })
        } else {
            const productadd = await product.create({ productname, category, subcategory, price, image: "http://localhost:8000/user_image/" + req.file.filename, quantity, Description, Inventory, Redeemable, Count });
            resp.status(200).send({ data: productadd, message: "Add succesfully ", success: true })
        }

    } catch {
        resp.status(500).send({ message: 'Internal server error' })
    }
}

const allproduct = async (req, resp) => {

    const productlength = await product.findAll({})
    const { page = 1, limit = 10 } = req.query; // default to page 1 and limit of 10
    const offset = (page - 1) * limit; // calculate the offset
    const proall = await product.findAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        attributes: ["id", "productname", "price", "image", "Description", "Inventory", "Redeemable", "Count", "quantity", "date"],
        include: [
            {
                model: cty,
                attributes: ["id", "category"]
            },
            {
                model: SubCty,
                attributes: ["id", "category"]
            }
        ]
    });
    resp.status(200).send({ data: proall, datalength: productlength.length });

}

const Deleteproduct = async (req, resp) => {
    const { id } = req.params;

    try {
        const productid = await product.findOne({ where: { id } });

        const filename = productid.dataValues.image.substring(productid.dataValues.image.lastIndexOf('/') + 1);
        const filePath = path.join("./img/" + filename);
        if (!productid) {
            return resp.status(404).send({ message: "product not found" });
        } else {
            if (productid) {
                fs.unlinkSync(filePath);
                await product.destroy({ where: { id } });
                return resp.status(200).send({ message: "product delete successfully" });
            }
        }
    } catch {
        resp.status(500).send({ message: "Internal server error" })
    }
}

const Productupdate = async (req, resp) => {
    // console.log("product:::", req.body, req.file);
    const { id } = req.params;
    const { productname, category, subcategory, price, quantity, Description, Inventory, Redeemable, Count } = req.body

    // const productid = await product.findByPk(id);
    const productdata = await product.findOne({ where: { id } });
    const filename = productdata.dataValues.image.substring(productdata.dataValues.image.lastIndexOf('/') + 1);
    const filePath = path.join('./img/' + filename);

    if (!productdata) {
        return resp.status(404).send({ error: 'Product not found' });
    } else {
        productdata.productname = productname;
        productdata.category = category;
        productdata.subcategory = subcategory;
        productdata.price = price;
        productdata.quantity = quantity;
        productdata.Description = Description;
        productdata.Inventory = Inventory;
        productdata.Redeemable = Redeemable;
        productdata.Count = Count;
        if (req.file) {
            productdata.image = "http://localhost:8000/user_image/" + req.file.filename;
            fs.unlinkSync(filePath);
            console.log("done")
        }

        await productdata.save();

        resp.status(200).send({ productdata, message: "Product succesfully update" })
    }
}

const Singelproduct = async (req, resp) => {
    const { id } = req.params;

    try {
        const singelproduct = await product.findOne({ where: { id } });
        if (!singelproduct) {
            return resp.status(404).send({ message: "product not found" });
        } else {
            return resp.status(200).send({ data: singelproduct });
        }
    } catch {
        resp.status(500).send({ message: "Internal server error" })
    }
}

const Searchproduct = async (req, resp) => {
    const searchvalue = req.query.value;

    const allproduct = await product.findAll({
        attributes: ["id", "productname", "price", "image", "Description", "Inventory", "Redeemable", "Count", "quantity", "date"],
        include: [
            {
                model: cty,
                attributes: ["id", "category"]
            },
            {
                model: SubCty,
                attributes: ["id", "category"]
            }
        ]
    })

    const results = allproduct.filter(item => {
        const searchString = `${item.productname} ${item.category} ${item.subcategory} ${item.Description} ${item.Inventory} ${item.Count} ${item.Redeemable} ${item.quantity}`.toLowerCase().toUpperCase();
        return searchString.includes(searchvalue.toLowerCase().toUpperCase());
    })
    resp.status(200).send({ results })
}

const ExportProduct = async (req, resp) => {
    const Productdata = await product.findAll({
        attributes: ["id", "productname", "price", "image", "Description", "Inventory", "Redeemable", "Count", "quantity", "date"],
        include: [
            {
                model: cty,
                attributes: ["id", "category"]
            },
            {
                model: SubCty,
                attributes: ["id", "category"]
            }
        ]
    });

    const JsonData = Productdata.map((data) => {
        return {
            id: data.id,
            productname: data.productname,
            category: data.Category.category,
            subcategory: data.Subcategory.category,
            price: data.price,
            image: data.image,
            Description: data.Description,
            quantity: data.quantity,
            Inventory: data.Inventory,
            Redeemable: data.Redeemable,
            Count: data.Count
        }
    });
    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(JsonData);
    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Products');
    // Save the workbook to a file
    const excelFilePath = 'C:/RITEN.AVRUT/NODE/Design-Bknd/uploads/products.xlsx';
    xlsx.writeFile(workbook, excelFilePath);

    resp.download(excelFilePath, 'products.xlsx', (err) => {
        if (err) {
            console.error('Error downloading the file:', err);
            resp.status(500).send('Error downloading the file.');
        } else {
            console.log('File downloaded successfully.');
            // // You can optionally delete the file after it has been downloaded
            // fs.unlinkSync(excelFilePath);
        }
    });
};


module.exports = {
    Addcategory, Addsubcategory, getsubCategory, getallcategory, getsubcategory, SuballCategory, Deletecategory, Updatecategory, DeleteSubcategory, Updatesubcategory, getmaincategory, getsingelcategory, getsingelsubcategory,
    Addproduct, allproduct, Deleteproduct, Productupdate, Singelproduct, Searchproduct, ExportProduct
}
