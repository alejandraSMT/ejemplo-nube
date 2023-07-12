import { Sequelize } from "sequelize";

/*export const sequelize = new Sequelize("ejemplodb","postgres","postgres",{
    host: "localhost",
    dialect: "postgres"
});*/

export const sequelize = new Sequelize(
    process.env.DATABASE_URL,{
        dialectOptions: {
            ssl:{
                require: true,
                rejectUnauthorized : false
            }
        }
    }
)
