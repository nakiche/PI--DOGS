const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
         type:DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
    },
    image:{
          type:DataTypes.STRING,
          allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type:DataTypes.STRING,
      allowNull:false
    },
    weight:{
      type:DataTypes.STRING,
      allowNull:false
    },
    life_span:{
      type:DataTypes.STRING,
      allowNull:false,
      set(value) {//SET como quiero que se guarde
        this.setDataValue('life_span', value + ' years');
      }
    }
  },{
    timestamps: false
  });
};
