"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../../config/dbConnect"));
class Movie extends sequelize_1.Model {
}
Movie.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    desc: {
        type: sequelize_1.DataTypes.STRING
    },
    genre: {
        type: sequelize_1.DataTypes.STRING
    },
    AuthorId: {
        type: sequelize_1.DataTypes.STRING,
    },
    ActorId: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: true,
    sequelize: dbConnect_1.default,
    underscored: false
});
exports.default = Movie;
