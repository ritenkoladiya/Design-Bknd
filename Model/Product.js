module.exports = (sequelize, DataTypes) => {
    const Addproduct = sequelize.define("Addproduct", {
        productname: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
        },
        subcategory: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.STRING,
        },
        Description: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        quantity: {
            type: DataTypes.STRING,
        },
        Inventory: {
            type: DataTypes.STRING,
        },
        Redeemable: {
            type: DataTypes.STRING,
        },
        Count: {
            type: DataTypes.STRING
        }
    }, {
        createdAt: "create_at",
        updatedAt: "modified_at"
    });
    return Addproduct;
}