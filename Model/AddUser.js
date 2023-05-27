module.exports = (sequelize, DataTypes) => {
    const AddUser = sequelize.define("AddUser", {
        FirstName: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     notEmpty: {
            //         args: [["en", "zh"]],
            //         field: "Fname",
            //         msg: "FirstName cannot be empty"
            //     }
            // }
        },
        LastName: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validator: {
            //     notEmpty: {
            //         args: [["en", "zh"]],
            //         field: "Lname",
            //         msg: "LastName cannot be empty"
            //     }
            // }
        },
        email: {
            type: DataTypes.STRING,
            // allowNull: false,
            // unique: true,
            // isEmail: true,
            // validate: {
            //     notEmpty: {
            //         args: [['en', 'zh']],
            //         field: "email",
            //         msg: 'email cannot be empty'
            //     }
            // }
        },
        ContactNumber: {
            type: DataTypes.INTEGER(10),
            // allowNull: false,
            // validate: {
            //     notEmpty: {
            //         args: [['en', 'zh']],
            //         field: "ContactNumber",
            //         msg: 'ContactNumber cannot be empty'
            //     }
            // }
        },
        ADDRESS_LINE_1: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     notEmpty: {
            //         args: [["en", "zh"]],
            //         field: "Address_line_1",
            //         msg: "Address cannot be empty"
            //     }
            // }
        },
        ADDRESS_LINE_2: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     notEmpty: {
            //         args: [["en", "zh"]],
            //         field: "Address_line_2",
            //         msg: "Address cannot be empty"
            //     }
            // }
        },
        image: {
            type: DataTypes.STRING,
            // allowNull: true,
            // validate: {
            //     notEmpty: {
            //         args: [["en", "zh"]],
            //         field: "image",
            //         msg: "Image cannot be empty"
            //     }
            // }
        },
        city: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     notEmpty: {
            //         args: [["en", "zh"]],
            //         field: "city",
            //         msg: "city cannot be empty"
            //     }
            // }
        },
        state: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     notEmpty: {
            //         args: [["en", "zh"]],
            //         field: "state",
            //         msg: "state cannot be empty"
            //     }
            // }
        },
        postcode: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            // validate: {
            //     notEmpty: {
            //         args: [["en", "zh"]],
            //         field: "postcode",
            //         msg: "postcode cannot be empty"
            //     }
            // }
        }
    }, {
        createdAt: "create_at",
        updatedAt: "modified_at"
    });
    return AddUser;
}