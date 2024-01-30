// models/Alumno.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Alumno', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    generación: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado_civil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lugar_de_nacimiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },


    trabajo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    puesto: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  

    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
};
