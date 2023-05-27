module.exports = (Sequelize, DataTypes) => {
    const Category = Sequelize.define('Category', {
        category: {
            type: DataTypes.STRING,
            // allowNull: false
        }
    });
    return Category;
}