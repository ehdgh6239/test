'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 예시코드
      models.Guest.hasMany(models.Cloth, { foreignKey: "guest_id" ,sourceKey: 'guest_id'  });
      models.Guest.hasMany(models.Review, { foreignKey: "guest_id", sourceKey: 'guest_id'  });
    }
  }
  Guest.init({
    guest_id: DataTypes.STRING,
    login_id: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    pw: DataTypes.STRING,
    point: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Guest',
  });
  return Guest;
};