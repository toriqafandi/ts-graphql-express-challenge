import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const dbName = 'admindb'
const userName = 'admin'
const password = 'admin123'
const dialect = 'postgres'

const sequelizeConnection = new Sequelize(dbName, userName, password, {
    host: 'localhost',
    dialect: dialect,
})

export default sequelizeConnection




