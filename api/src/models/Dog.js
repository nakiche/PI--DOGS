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
      set(value) {//SET como quiero que se guarde
        this.setDataValue('name', value.charAt(0).toUpperCase()+ value.slice(1));
      }
    },
    min_weight:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    max_weight:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    height:{
      type:DataTypes.STRING,
      allowNull:false
    },
    life_span:{
      type:DataTypes.STRING,
      allowNull:false,
      set(value) {//SET como quiero que se guarde
        this.setDataValue('life_span', value + ' years');
      }
    }, owner: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  },{
    timestamps: false
  });
};
