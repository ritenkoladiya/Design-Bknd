module.exports = (Sequelize, DataTypes) => {
    const Subcategory = Sequelize.define('Subcategory', {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        category_id: {
            type: DataTypes.STRING,
            // primaryKey: true,
            allowNull: false,
            unique: false
        }
    });
    return Subcategory;
}