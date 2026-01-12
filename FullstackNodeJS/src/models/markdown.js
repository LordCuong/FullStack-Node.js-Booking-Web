'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    //   User.belongsTo(models.Allcode, { foreignkey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
    //   User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
    // }
    static associate(models) {
    //   User.belongsTo(models.Allcode, {
    //     foreignKey: 'positionId',
    //     targetKey: 'keyMap',
    //     as: 'positionData'
    //   });

    //   User.belongsTo(models.Allcode, {
    //     foreignKey: 'gender',
    //     targetKey: 'keyMap',
    //     as: 'genderData'
    //   });
    Markdown.belongsTo(models.User, {foreignKey: 'doctorId'})
    }

  };
  Markdown.init({
    contentHTML: DataTypes.TEXT('long'),
    contentMarkdown: DataTypes.TEXT('long'),
    description: DataTypes.TEXT('long'),
    doctorId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Markdown',
  });
  return Markdown;
};