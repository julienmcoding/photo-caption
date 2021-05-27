'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ photo }) {
      // define association here
      this.hasMany(photo, { foreignKey: 'userId', as: 'photos' });
    }

    toJSON(){
      return {...this.get(), id: undefined };
    }
  };
  User.init(
    {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name' },
        notEmpty: { msg: 'Name must not be empty'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have an email' },
        notEmpty: { msg: 'Email must not be empty'}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name' },
        notEmpty: { msg: 'Name must not be empty'},
        isEmail: { msg: 'Must be a valid email address'}
      }
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};