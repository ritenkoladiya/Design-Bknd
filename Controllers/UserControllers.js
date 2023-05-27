var db = require("../Config sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysecretkey = "mysecretkey";
const fs = require('fs');
const path = require("path")
// import * as fs from 'node:fs';
const Users = db.UsersData;
const UserAdd = db.AddUser;

const UserRgster = async (req, resp) => {
    const { FirstName, LastName, email, ContactNumber, password } = req.body;
    try {
        if (!FirstName || !LastName || !email || !ContactNumber || !password) {
            return resp.status(409).send({ message: 'All filed required' })
        }
        //check if user already exists
        const userExists = await Users.findOne({ where: { email } });
        if (userExists) {
            return resp.status(409).send({ message: 'Username already taken' })
        }


        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const NewUser = await Users.create({ FirstName, LastName, email, ContactNumber, password: hashedPassword });
        const jwttoken = jwt.sign({ id: NewUser.id }, mysecretkey);
        // var decoded = jwt.verify(token, mysecretkey);
        // console.log("first", decoded);
        const data = JSON.parse(JSON.stringify(NewUser))
        data.token = jwttoken;
        console.log("NewUser",)
        resp.status(200).send({ data: data, message: "Registration succesfully!", success: true })

    } catch {
        // if (error) {
        //     error.errors.map((e) => {
        //         resp.status(401).send([{ data: e.instance }, { Error: e.message }, { success: false }])
        //     })
        // } else {
        resp.status(500).send({ message: 'Internal server error' })
        // }
    }
}

const userlogin = async (req, resp) => {
    const { email, password } = req.body;
    console.log("first--------------", req.body)
    try {
        if (!email || !password) {
            return resp.status(409).send({ message: 'All filed required' })
        }
        // console.log('req.body', req.body)
        //Check if user with the given username exists
        const user = await Users.findOne({ where: { email } });
        // console.log("userr", user.dataValues)
        if (!user) {
            return resp.status(401).send({ message: 'Invalid credentials' })
        }
        //check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return resp.status(401).send({ message: 'Invalid credentials' })
        }

        //jwt token
        const token = jwt.sign({ id: user.id }, mysecretkey)
        var decoded = jwt.verify(token, mysecretkey);
        console.log("first", decoded);
        const data = JSON.parse(JSON.stringify(user))
        data.token = token;

        resp.status(200).send({ data, message: "Login succesfully!", success: true })
        // console.log('token', token)
    } catch {
        resp.status(500).send({ message: 'Internal server error' })
    }
}

const UsersAdd = async (req, resp) => {
    const { FirstName, LastName, email, ContactNumber, ADDRESS_LINE_1, ADDRESS_LINE_2, city, state, postcode } = req.body;
    // console.log("req.body-------------", { FirstName, LastName, email, ContactNumber, ADDRESS_LINE_1, ADDRESS_LINE_2, image: "http://localhost:8000/user_image/" + req.file.filename, city, state, postcode });
    // const { user_image } = req.file.filename;
    // const { filename } = req.file;
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa---------------",req);
    // console.log("Image-------------------", req.file);
    // const image = req.file;
    // const imageName = uuidv4() + path.extname(image.originalname);
    // const imagePath = path.join(__dirname, "..", "public", "productImage", imageName);
    // await image.mv(imagePath)

    try {
        if (!FirstName || !LastName || !email || !ContactNumber || !ADDRESS_LINE_1 || !ADDRESS_LINE_2 || !city || !state || !postcode) {
            return resp.status(409).send({ message: 'All filed required' })
        }

        const Adduser = await UserAdd.findOne({ where: { email } });
        if (Adduser) {
            resp.status(409).send({ message: "Username already taken" });
        }
        else {
            const newUser = await UserAdd.create({ FirstName, LastName, email, ContactNumber, ADDRESS_LINE_1, ADDRESS_LINE_2, image: "http://localhost:8000/user_image/" + req.file.filename, city, state, postcode });
            // const newUser = await UserAdd.create({ image: "http://localhost:8000/user_image/" + req?.file?.filename, });
            resp.status(200).send({ data: newUser, message: "Add succesfully ", success: true })
        }
    } catch {
        resp.status(500).send({ message: 'Internal server error' })

    }
}

const GetAlluser = async (req, resp) => {

    try {
        const Users = await UserAdd.findAll({});
        const { page = 1, limit = 10 } = req.query; // default to page 1 and limit of 10
        const offset = (page - 1) * limit; // calculate the offset
        const getProducts = await UserAdd.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        // console.log("first-----------------------------------------------", Users.length)
        if (getProducts) {
            resp.send({
                success: true,
                message: "Products found successfully!",
                datalength: Users.length,
                data: getProducts
            });
        } else {
            resp.send({
                success: false,
                message: "Products not found!",
                data: []
            });
        }
    } catch (error) {
        console.log("error :>> ", error);
        return resp.status(500).json({ success: false, message: "Internal server error!" });
    }

    // try {
    //     const Alluser = await UserAdd.findAll({});
    //     resp.status(200).send(Alluser)
    // } catch (err) {
    //     resp.status(400).send({ err })
    // }   
}

const GetSingeluser = async (req, resp) => {
    const { id } = req.params;
    try {
        // const user = await UserAdd.findByPk(id);

        const Users = await UserAdd.findOne({ where: { id } });

        if (!Users) {
            return resp.status(404).send({ error: 'User not found' });
        } else if (Users) {
            return resp.status(200).send({ Users })
        }
    } catch (err) {
        console.log("errrr", err);
    }
}

const UpdateUser = async (req, resp) => {
    const { id } = req.params;
    const { FirstName, LastName, email, ContactNumber, ADDRESS_LINE_1, ADDRESS_LINE_2, city, state, postcode } = req.body;

    try {
        if (!FirstName || !LastName || !email || !ContactNumber || !ADDRESS_LINE_1 || !ADDRESS_LINE_2 || !city || !state || !postcode) {
            return resp.status(409).send({ message: 'All filed required' })
        }

        const user = await UserAdd.findByPk(id);
        const users = await UserAdd.findOne({ where: { id } });

        if (!users) {
            return resp.status(404).send({ error: 'User not found' })
        } else {
            if (user) {
                const filename = user.dataValues.image.substring(user.dataValues.image.lastIndexOf('/') + 1);
                console.log("first-------------", filename)
                const filePath = path.join('./img/' + filename);

                user.FirstName = FirstName;
                user.LastName = LastName;
                user.email = email;
                user.ContactNumber = ContactNumber;
                user.ADDRESS_LINE_1 = ADDRESS_LINE_1;
                user.ADDRESS_LINE_2 = ADDRESS_LINE_2;
                console.log("req.file", req.file)
                if (req.file) {
                    user.image = "http://localhost:8000/user_image/" + req.file.filename
                    fs.unlinkSync(filePath);
                    console.log("okokok")
                }
                user.city = city;
                user.state = state;
                user.postcode = postcode;

                await user.save();

                resp.status(200).send({ user, message: "user succesfully update", success: true });
            }
        }
    } catch (err) {
        console.error(err);
        return resp.status(500).send({ error: "Server error" })
    }
}

const DeleteUser = async (req, resp) => {
    const { id } = req.params;
    // const imageId = req.params.imageId;
    // const imagePath = req.body.imagePath;
    // console.log("first------------------", imagePath, imageId)
    try {
        const userid = await UserAdd.findOne({ where: { id } });
        const filename = userid.dataValues.image.substring(userid.dataValues.image.lastIndexOf('/') + 1);
        if (!userid) {
            return resp.status(404).send({ message: "User not found " })
        } else {
            if (userid) {
                const filePath = path.join('./img/' + filename);
                fs.unlinkSync(filePath);
                console.log("okok", __dirname)
                // fs.unlink('')
                await UserAdd.destroy({ where: { id } });
                return resp.status(200).send({ message: 'User deleted successfully' });
            }
        }
    } catch (err) {
        resp.status(500).send({ error: err.message })
    }
}

const Searchuser = async (req, resp) => {
    // const searchFirstName = req.query.FirstName;
    // const searchLastName = req.query.LastName;
    // const searchCity = req.query.city;
    // const searchState = req.query.state;

    const searchQuery = req.query.value;

    const Alluser = await UserAdd.findAll({});

    const results = Alluser.filter(item => {
        const searchString = `${item.FirstName} ${item.LastName} ${item.city} ${item.state}`.toLowerCase();
        return searchString.includes(searchQuery.toLowerCase());
    })

    // const results = Alluser.filter(item => {
    //     const firstNameMatch = !searchFirstName || item.FirstName.toLowerCase().includes(searchFirstName.toLowerCase());
    //     const lastNameMatch = !searchLastName || item.LastName.toLowerCase().includes(searchLastName.toLowerCase());
    //     const cityMatch = !searchCity || item.city.toLowerCase().includes(searchCity.toLowerCase());
    //     const stateMatch = !searchState || item.state.toLowerCase().includes(searchState.toLowerCase());
    //     return firstNameMatch && lastNameMatch && cityMatch && stateMatch;
    // });
    resp.status(200).send({ results })
}

module.exports = {
    UserRgster, userlogin, UsersAdd, GetAlluser, GetSingeluser, UpdateUser, DeleteUser, Searchuser
}