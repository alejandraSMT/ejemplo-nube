import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Curso = sequelize.define("Curso", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seccion: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    numero_vacantes: {
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
})