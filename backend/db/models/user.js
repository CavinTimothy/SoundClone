'use strict';
const { Model, Op, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // ***JWT PAYLOAD OBJECT***
    // Returns an object with only the User instance information
    // that is safe to save to a JWT.
    toSafeObject() {
      const { id, username, email } = this; // Context will be the User instance.
      return { id, username, email };
    }
    // ***PASSWORD VALIDATOR***
    // Accepts a password string and returns true if there is a match with the
    // User instance's hashed password. If there is no match, it returns false.
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    // ***RETURN USER INFORMATION***
    // Uses the currentUser scope to return a User with the specified id.
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    // ***USER LOGIN**
    // Accepts object with credential and password keys.
    // Searches for a User with the specified credential (username or email).
    // If user is found, validate password by passing it into .validatePassword.
    // If password is valid, return using currentUser scope.
    static async login({ credential, password }) {
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    // ***NEW USER SIGNUP***
    // Accepts object with username, email, and password key.
    // Hashes password using the bcryptjs's hashSync method.
    // Create User with the username, email, and password.
    // Return new user using currentUser scope.
    static async signup({ firstName, lastName, email, username, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Required'
        },
        len: {
          args: [3, 256],
          msg: 'Must be valid email'
        },
        isEmail: {
          args: true,
          msg: 'Must be valid email'
        }
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Required'
        },
        len: {
          args: [4, 30],
          msg: 'Username must be 3-30 characters long'
        },
        isNotEmail(val) {
          if (Validator.isEmail(val)) {
            throw new Error('Username must not be email');
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Required'
        },
        len: [60, 60]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
