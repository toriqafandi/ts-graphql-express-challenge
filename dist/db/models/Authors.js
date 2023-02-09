"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../../config/dbConnect"));
class Authors extends sequelize_1.Model {
}
Authors.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    age: {
        type: sequelize_1.DataTypes.STRING
    },
    address: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: true,
    sequelize: dbConnect_1.default,
    underscored: false
});
exports.default = Authors;
