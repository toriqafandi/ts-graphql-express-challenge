"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const generateToken_1 = __importDefault(require("../helpers/generateToken"));
const bcrypt = __importStar(require("bcryptjs"));
const User_1 = __importDefault(require("../db/models/User"));
const Actors_1 = __importDefault(require("../db/models/Actors"));
const Authors_1 = __importDefault(require("../db/models/Authors"));
const Movie_1 = __importDefault(require("../db/models/Movie"));
const sequelize_1 = require("sequelize");
const userAll = new graphql_1.GraphQLObjectType({
    name: 'userList',
    fields: () => ({
        username: {
            type: graphql_1.GraphQLString
        },
        email: {
            type: graphql_1.GraphQLString
        },
        token: {
            type: graphql_1.GraphQLString
        }
    })
});
const UserType = new graphql_1.GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {
            type: graphql_1.GraphQLString
        },
        username: {
            type: graphql_1.GraphQLString
        },
        email: {
            type: graphql_1.GraphQLString
        },
        password: {
            type: graphql_1.GraphQLString
        }
    })
});
const AuthPayloadType = new graphql_1.GraphQLObjectType({
    name: 'Authpayload',
    fields: () => ({
        token: {
            type: graphql_1.GraphQLString
        },
        message: {
            type: graphql_1.GraphQLString
        },
        user: {
            type: UserType
        }
    })
});
const Movies = new graphql_1.GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {
            type: graphql_1.GraphQLInt,
        },
        title: {
            type: graphql_1.GraphQLString,
        },
        genre: {
            type: graphql_1.GraphQLString,
        },
        author: {
            type: graphql_1.GraphQLString,
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield Authors_1.default.findOne({
                        where: {
                            id: parent.AuthorId
                        }
                    });
                    const data = JSON.parse(JSON.stringify(result, null, 2));
                    return data.name;
                });
            }
        },
        actor: {
            type: graphql_1.GraphQLString,
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield Actors_1.default.findOne({
                        where: {
                            id: parent.ActorId
                        }
                    });
                    const data = JSON.parse(JSON.stringify(result, null, 2));
                    return data.name;
                });
            },
        },
        authorId: {
            type: graphql_1.GraphQLInt,
            resolve(parent, args) {
                return parent.AuthorId;
            }
        },
        actorId: {
            type: graphql_1.GraphQLInt,
            resolve(parent, args) {
                return parent.ActorId;
            },
        },
        desc: {
            type: graphql_1.GraphQLString,
        }
    })
});
const ChangeLoadMovie = new graphql_1.GraphQLObjectType({
    name: 'ChangeLoadMovie',
    fields: () => ({
        movie: {
            type: Movies,
        },
        message: {
            type: graphql_1.GraphQLString,
        }
    })
});
/* Author */
const Author = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: graphql_1.GraphQLInt,
        },
        name: {
            type: graphql_1.GraphQLString,
        },
        age: {
            type: graphql_1.GraphQLInt,
        },
        address: {
            type: graphql_1.GraphQLString,
        },
        movie: {
            type: new graphql_1.GraphQLList(Movies),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Movie_1.default.findAll({
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        where: {
                            AuthorId: parent.id,
                        }
                    });
                });
            }
        }
    })
});
const ChangeLoadAuthor = new graphql_1.GraphQLObjectType({
    name: 'ChangeLoadAuthor',
    fields: () => ({
        author: {
            type: Author,
        },
        message: {
            type: graphql_1.GraphQLString,
        }
    })
});
/* Actor */
const Actor = new graphql_1.GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        id: {
            type: graphql_1.GraphQLInt,
        },
        name: {
            type: graphql_1.GraphQLString,
        },
        age: {
            type: graphql_1.GraphQLString,
        },
        address: {
            type: graphql_1.GraphQLString,
        },
        movie: {
            type: new graphql_1.GraphQLList(Movies),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Movie_1.default.findAll({
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        where: {
                            ActorId: parent.id,
                        }
                    });
                });
            }
        }
    })
});
const ChangeLoadActor = new graphql_1.GraphQLObjectType({
    name: 'ChangeLoadActor',
    fields: () => ({
        actor: {
            type: Actor,
        },
        message: {
            type: graphql_1.GraphQLString,
        }
    })
});
/* Main Query */
const rootQuery = new graphql_1.GraphQLObjectType({
    name: "rootQuery",
    fields: () => ({
        /* --------- MOVIES ------------ */
        movieList: {
            type: new graphql_1.GraphQLList(Movies),
            resolve() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Movie_1.default.findAll({
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    });
                });
            }
        },
        MovieById: {
            type: Movies,
            args: {
                id: {
                    type: graphql_1.GraphQLInt
                }
            },
            resolve(parent, { id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Movie_1.default.findOne({
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        where: {
                            id: id
                        }
                    });
                });
            }
        },
        MovieByTitle: {
            type: new graphql_1.GraphQLList(Movies),
            args: {
                title: {
                    type: graphql_1.GraphQLString
                }
            },
            resolve(parent, { title }) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Movie_1.default.findAll({
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        where: {
                            title: {
                                [sequelize_1.Op.iLike]: `%${title}%`
                            }
                        }
                    });
                });
            }
        },
        /* --------- ACTORS ------------ */
        actorList: {
            type: new graphql_1.GraphQLList(Actor),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Actors_1.default.findAll({
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    });
                });
            }
        },
        actorById: {
            type: Actor,
            args: {
                id: {
                    type: graphql_1.GraphQLInt,
                }
            },
            resolve(parent, { id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Actors_1.default.findOne({
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        where: {
                            id: id
                        }
                    });
                });
            }
        },
        /* --------- AUTHORS ------------ */
        authorList: {
            type: new graphql_1.GraphQLList(Author),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Authors_1.default.findAll({
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    });
                });
            }
        },
        authorById: {
            type: Author,
            args: {
                id: {
                    type: graphql_1.GraphQLInt,
                }
            },
            resolve(parent, { id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Authors_1.default.findOne({
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        where: {
                            id: id
                        }
                    });
                });
            }
        },
        userList: {
            type: new graphql_1.GraphQLList(userAll),
            resolve() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield User_1.default.findAll({
                        attributes: ['username', 'email', 'token']
                    });
                });
            }
        }
    })
});
const Mutations = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        /* Login */
        registerUser: {
            type: AuthPayloadType,
            args: {
                username: {
                    type: graphql_1.GraphQLString
                },
                email: {
                    type: graphql_1.GraphQLString
                },
                password: {
                    type: graphql_1.GraphQLString
                }
            },
            resolve(parent, { username, email, password }) {
                return __awaiter(this, void 0, void 0, function* () {
                    let message = 'User registered failed';
                    const result = yield User_1.default.create({
                        username: username,
                        email: email,
                        password: yield bcrypt.hash(password, 10)
                    }).then(() => __awaiter(this, void 0, void 0, function* () {
                        const token = (0, generateToken_1.default)(email, username);
                        yield User_1.default.update({ token: token }, {
                            where: {
                                username: username,
                                email: email
                            }
                        }).catch(err => console.log(err));
                        return {
                            token,
                            user: {
                                username,
                                email
                            },
                            message: 'User registered successfuly'
                        };
                    })).catch(err => {
                        return {
                            user: {
                                username,
                                email
                            },
                            message: message
                        };
                    });
                    return result;
                });
            }
        },
        /* Movies */
        addMovie: {
            type: ChangeLoadMovie,
            args: {
                data: {
                    type: new graphql_1.GraphQLInputObjectType({
                        name: 'movieAdd',
                        fields: {
                            title: {
                                type: graphql_1.GraphQLString,
                            },
                            genre: {
                                type: graphql_1.GraphQLString,
                            },
                            desc: {
                                type: graphql_1.GraphQLString,
                            },
                            ActorId: {
                                type: graphql_1.GraphQLInt,
                            },
                            AuthorId: {
                                type: graphql_1.GraphQLInt,
                            }
                        }
                    })
                }
            },
            resolve(parent, { data }) {
                return __awaiter(this, void 0, void 0, function* () {
                    let msg = "Failed to Insert";
                    console.log(data);
                    if (data) {
                        const result = yield Movie_1.default.create(data).then(() => {
                            return true;
                        }).catch((err) => {
                            console.log(err);
                            return false;
                        });
                        if (result) {
                            msg = "Insert Movie Successfully";
                        }
                        return {
                            movie: {
                                title: data.title,
                                genre: data.genre,
                                desc: data.desc,
                            },
                            message: msg
                        };
                    }
                });
            }
        },
        updateMovie: {
            type: ChangeLoadMovie,
            args: {
                id: {
                    type: graphql_1.GraphQLInt
                },
                value: {
                    type: new graphql_1.GraphQLInputObjectType({
                        name: 'MovieUpdate',
                        fields: {
                            title: {
                                type: graphql_1.GraphQLString,
                            },
                            desc: {
                                type: graphql_1.GraphQLString,
                            },
                            genre: {
                                type: graphql_1.GraphQLString,
                            },
                            AuthorId: {
                                type: graphql_1.GraphQLInt,
                            },
                            ActorId: {
                                type: graphql_1.GraphQLInt,
                            }
                        }
                    })
                }
            },
            resolve(parent, { id, value }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield Movie_1.default.update(value, {
                        where: {
                            id: id
                        }
                    });
                    const selectUpdate = yield Movie_1.default.findOne({
                        where: {
                            id: id
                        },
                        raw: true
                    });
                    const data = JSON.parse(JSON.stringify(selectUpdate, null, 2));
                    console.log(data);
                    return {
                        movie: {
                            id: data.id,
                            title: data.title,
                            genre: data.genre
                        },
                        message: "Update Successfully"
                    };
                });
            }
        },
        deleteMovie: {
            type: ChangeLoadMovie,
            args: {
                id: {
                    type: graphql_1.GraphQLInt
                }
            },
            resolve(parent, { id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    Movie_1.default.destroy({
                        where: {
                            id: id
                        }
                    });
                    return {
                        message: "Deleted Successfully"
                    };
                });
            }
        },
        /* Author */
        addAuthor: {
            type: ChangeLoadAuthor,
            args: {
                data: {
                    type: new graphql_1.GraphQLInputObjectType({
                        name: 'authorAdd',
                        fields: {
                            name: {
                                type: graphql_1.GraphQLString
                            },
                            age: {
                                type: graphql_1.GraphQLInt
                            },
                            address: {
                                type: graphql_1.GraphQLString
                            }
                        }
                    })
                }
            },
            resolve(parent, { data }) {
                return __awaiter(this, void 0, void 0, function* () {
                    let msg = "Failed to Insert";
                    if (data) {
                        const result = yield Authors_1.default.create(data).then(() => {
                            return true;
                        }).catch((err) => {
                            return false;
                        });
                        if (result) {
                            msg = "Insert Author Successfully";
                        }
                        return {
                            author: {
                                name: data.name,
                                age: data.age,
                                address: data.address
                            },
                            message: msg
                        };
                    }
                });
            }
        },
        updateAuthorById: {
            type: ChangeLoadAuthor,
            args: {
                id: {
                    type: graphql_1.GraphQLInt
                },
                value: {
                    type: new graphql_1.GraphQLInputObjectType({
                        name: 'AuthorValue',
                        fields: {
                            name: {
                                type: graphql_1.GraphQLString
                            },
                            age: {
                                type: graphql_1.GraphQLInt
                            },
                            address: {
                                type: graphql_1.GraphQLString
                            },
                        }
                    })
                }
            },
            resolve(parent, { id, value }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield Authors_1.default.update(value, {
                        where: {
                            id: id
                        }
                    });
                    const selectUpdate = yield Authors_1.default.findOne({
                        where: {
                            id: id
                        },
                        raw: true
                    });
                    const data = JSON.parse(JSON.stringify(selectUpdate, null, 2));
                    return {
                        author: {
                            name: data.name,
                            age: data.age,
                            address: data.address,
                        },
                        message: "Update Successfully"
                    };
                });
            }
        },
        deleteAuthor: {
            type: ChangeLoadAuthor,
            args: {
                id: {
                    type: graphql_1.GraphQLInt
                }
            },
            resolve(parent, { id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    Authors_1.default.destroy({
                        where: {
                            id: id
                        }
                    });
                    return {
                        message: "Deleted Successfully"
                    };
                });
            }
        },
        /* Actor */
        addActor: {
            type: ChangeLoadActor,
            args: {
                data: {
                    type: new graphql_1.GraphQLInputObjectType({
                        name: 'actorAdd',
                        fields: {
                            name: {
                                type: graphql_1.GraphQLString
                            },
                            age: {
                                type: graphql_1.GraphQLInt
                            },
                            address: {
                                type: graphql_1.GraphQLString
                            }
                        }
                    })
                }
            },
            resolve(parent, { data }) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        const result = yield Actors_1.default.create(data).then(() => {
                            return {
                                actor: {
                                    name: data.name,
                                    age: data.age,
                                    address: data.address
                                },
                                message: "Successfully"
                            };
                        }).catch(() => {
                            return {
                                message: "Failed to Insert"
                            };
                        });
                        return result;
                    }
                });
            }
        },
        updateActorById: {
            type: ChangeLoadActor,
            args: {
                id: {
                    type: graphql_1.GraphQLInt
                },
                value: {
                    type: new graphql_1.GraphQLInputObjectType({
                        name: 'ActorValue',
                        fields: {
                            name: {
                                type: graphql_1.GraphQLString
                            },
                            age: {
                                type: graphql_1.GraphQLInt
                            },
                            address: {
                                type: graphql_1.GraphQLString
                            },
                        }
                    })
                }
            },
            resolve(parent, { id, value }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield Actors_1.default.update(value, {
                        where: {
                            id: id
                        }
                    });
                    console.log(result);
                    const selectUpdate = yield Actors_1.default.findOne({
                        where: {
                            id: id
                        },
                        raw: true
                    });
                    const data = JSON.parse(JSON.stringify(selectUpdate, null, 2));
                    return {
                        actor: {
                            id: id,
                            name: data.name,
                            age: data.age,
                            address: data.address,
                        },
                        message: "Update Successfully"
                    };
                });
            }
        },
        deleteActor: {
            type: ChangeLoadActor,
            args: {
                id: {
                    type: graphql_1.GraphQLInt
                }
            },
            resolve(parent, { id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    Actors_1.default.destroy({
                        where: {
                            id: id
                        }
                    });
                    return {
                        message: "Deleted Successfully"
                    };
                });
            }
        }
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: rootQuery,
    mutation: Mutations
});
