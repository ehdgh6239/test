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
      // models.Cloth.hasMany(models.Guest, { foreignKey: "guest_id" });
      // models.Cloth.hasMany(models.Owner, { foreignKey: "owner_id" });
      models.Cloth.belongsTo(models.Guest, { foreignKey: "guest_id" ,targetKey: 'guest_id'  });
      models.Cloth.belongsTo(models.Owner, { foreignKey: "owner_id", targetKey: 'owner_id'  });
    }
  }
  Cloth.init({
    cloth_id: DataTypes.INTEGER,
    guest_id: DataTypes.STRING,
    owner_id: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    address: DataTypes.STRING,
    ask: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cloth',
  });
  return Cloth;
};