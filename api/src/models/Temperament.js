const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Temperament', {
    id:{
         type:DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
    },
    name: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
  },{ 
    timestamps: false
  });
};