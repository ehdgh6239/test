'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cloth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 예시코드
      models.Cloth.belongsTo(models.Guest, { foreignKey: "guest_id"});
      models.Cloth.belongsTo(models.Owner, { foreignKey: "owner_id"});
    }
  }
  Cloth.init({
    cloth_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    guest_id: DataTypes.STRING,
    owner_id: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    address: DataTypes.STRING,
    ask: DataTypes.STRING,
    img: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cloth',
  });
  return Cloth;
};