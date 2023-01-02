'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 예시코드
      models.Review.belongsTo(models.Guest, { foreignKey: "guest_id" ,targetKey: 'guest_id'  });
      models.Review.belongsTo(models.Owner, { foreignKey: "owner_id", targetKey: 'owner_id'  });
    }
  }
  Review.init({
    review_id: DataTypes.INTEGER,
    guest_id: DataTypes.STRING,
    owner_id: DataTypes.STRING,
    rate: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};