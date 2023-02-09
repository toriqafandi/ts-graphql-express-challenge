"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbName = 'admindb';
const userName = 'admin';
const password = 'admin123';
const dialect = 'postgres';
const sequelizeConnection = new sequelize_1.Sequelize(dbName, userName, password, {
    host: 'localhost',
    dialect: dialect,
});
exports.default = sequelizeConnection;
