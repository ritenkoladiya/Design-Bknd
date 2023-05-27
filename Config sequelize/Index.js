const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("Design-BKND", "root", "", {
    host: "localhost",
    dialect: "mysql",
})

sequelize.authenticate()
    .then(() => {
        console.log("Connected");
    }).catch((err) => {
        console.log(err)
    })

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const UsersData = require('../Model/UserModel')(sequelize, Sequelize.DataTypes);
const AddUser = require('../Model/AddUser')(sequelize, Sequelize.DataTypes);
const Cty = require('../Model/category')(sequelize, Sequelize.DataTypes);
const SubCty = require('../Model/Subcategory')(sequelize, Sequelize.DataTypes);
const product = require('../Model/Product')(sequelize, Sequelize.DataTypes);

//----one to many
Cty.hasMany(SubCty, { foreignKey: "category_id" });
SubCty.belongsTo(Cty, { foreignKey: "category_id", as: 'category_detail' });

//---one to many
Cty.hasMany(product, { foreignKey: "category" });
product.belongsTo(Cty, { foreignKey: "category" })

SubCty.hasMany(product, { foreignKey: "subcategory" });
product.belongsTo(SubCty, { foreignKey: "subcategory" })

module.exports = { db, UsersData, AddUser, Cty, SubCty, product };


db.sequelize.sync({ force: false }).then(() => {
    console.log("yes")
})