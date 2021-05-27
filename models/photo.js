'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: "user"});
    }

    toJSON(){
      return { ...this.get(), id: undefined, userId: undefined };
    }
  };
  photo.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'photos',
    modelName: 'photo',
  });
  return photo;
};