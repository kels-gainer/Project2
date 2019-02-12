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
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 40]
        }
      },
      instanceImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 80]
        }
      },
      imageUrl: {
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
