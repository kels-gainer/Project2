module.exports = function(sequelize, DataTypes) {
  var Meme = sequelize.define(
    "Meme",
    {
      uID: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 60]
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 40]
        }
      },
      favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 40]
        }
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 80]
        }
      },
      text0: DataTypes.STRING,
      text1: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
  return Meme;
};
