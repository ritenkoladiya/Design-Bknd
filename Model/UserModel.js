module.exports = (sequelize, DataTypes) => {
    const userData = sequelize.define("usersdata", {
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     notEmpty: {
            //         args: [['en', 'zh']],
            //         field: "name",
            //         msg: 'FirstName cannot be empty'
            //     }
            // }
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     notEmpty: {
            //         args: [['en', 'zh']],
            //         field: "name",
            //         msg: 'LastName cannot be empty'
            //     }
            // }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
            // validate: {
            //     notEmpty: {
            //         args: [['en', 'zh']],
            //         field: "name",
            //         msg: 'email cannot be empty'
            //     }
            // }
        },
        ContactNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // validate: {
            //     notEmpty: {
            //         args: [['en', 'zh']],
            //         field: "name",
            //         msg: 'ContactNumber cannot be empty'
            //     }
            // }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     notEmpty: {
            //         args: [['en', 'zh']],
            //         field: "name",
            //         msg: 'password cannot be empty'
            //     }
            // }
        }
    }, {
        createdAt: "create_at",
        updatedAt: "modified_at"
    });
    return userData;
}