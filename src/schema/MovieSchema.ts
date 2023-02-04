import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLInputObjectType, GraphQLScalarType } from "graphql"
import Movie from "../db/models/Movie"


const userAll = new GraphQLObjectType({
    name: 'userList',
    fields: () => ({
        username: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        token: {
            type: GraphQLString
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({ 
        id: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    })
})

const AuthPayloadType = new GraphQLObjectType({
    name: 'Authpayload',
    fields: () => ({
        token: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        },
        user: {
            type: UserType
        }
    })
})

const Movies = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {
            type: GraphQLInt,
        },
        title: {
            type: GraphQLString,
        },
        genre: {
            type: GraphQLString,
        },
        author: {
            type: GraphQLString,
            async resolve(parent, args){
                const result = await Authors.findOne({
                    attributes: ['name'],
                    where: {
                        id: parent.AuthorId
                    }
                })
                const data = JSON.parse(JSON.stringify(result, null, 2))  
                return data.name
            }
        },
        actor: {
            type: GraphQLString,
            async resolve(parent, args){
                const result = await Actors.findOne({
                    attributes: ['name'],
                    where: {
                        id: parent.ActorId
                    }
                })
                const data = JSON.parse(JSON.stringify(result, null, 2))  
                return data.name
            },
        },
        authorId: {
            type: GraphQLString,
        },
        actorId: {
            type: GraphQLString,
        },
        desc:{
            type: GraphQLString,    
        }
    }) 
})

const ChangeLoadMovie = new GraphQLObjectType({
    name: 'ChangeLoadMovie',
    fields: () => ({
        movie: {
            type: Movies,
        },
        message: {
            type: GraphQLString,
        }
    }) 
})

/* Author */
const Author = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLInt,
        },
        name: {
            type: GraphQLString,
        },
        age: {
            type: GraphQLString,
        },
        address: {
            type: GraphQLString,
        },
        movie: {
            type: new GraphQLList(Movies),
            async resolve(parent, args){
                return await Movie.findAll({
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    where: {
                        AuthorId: parent.id,
                    }
                })
            }
        }
    }) 
})

const ChangeLoadAuthor = new GraphQLObjectType({
    name: 'ChangeLoadAuthor',
    fields: () => ({
        author: {
            type: Author,
        },
        message: {
            type: GraphQLString,
        }
    }) 
})

/* Actor */
const Actor = new GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        id: {
            type: GraphQLInt,
        },
        name: {
            type: GraphQLString,
        },
        age: {
            type: GraphQLString,
        },
        address: {
            type: GraphQLString,
        },
        movie: {
            type: new GraphQLList(Movies),
            async resolve(parent, args){
                return await Movie.findAll({
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    where: {
                        ActorId: parent.id,
                    }
                })
            }
        }
    }) 
})

const ChangeLoadActor = new GraphQLObjectType({
    name: 'ChangeLoadActor',
    fields: () => ({
        actor: {
            type: Actor,
        },
        message: {
            type: GraphQLString,
        }
    }) 
})

/* Main Query */
const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: () => ({
        // books: {
        //     type: new GraphQLList(BookType),
        //     resolve(parent, args) {
        //         return MovieData
        //     }
        // },
        // bookById: {
        //     type: BookType,
        //     args: {
        //         id: {
        //             type: GraphQLString
        //         }
        //     },
        //     resolve(parent, {id}) {
        //         return MovieData.filter(a => a.id === id)[0]
        //     }
        // },

        /* --------------------- */
        /* --------- MOVIES ------------ */
        movieList: {
            type: new GraphQLList(Movies),
            async resolve(){
                return await Movie.findAll({
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                })
            }
        },

        MovieById: {
            type: Movies,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            async resolve(parent, { id }){
                return await Movie.findOne({
                    attributes:{
                        exclude: ['createdAt', 'updatedAt']
                    },
                    where:{
                        id: id
                    }
                })
            }
        },

        /* --------- ACTORS ------------ */
        actorList: {
            type: new GraphQLList(Actor),
            async resolve(parent, args){
                return await Actors.findAll({
                    attributes:{
                        exclude: ['createdAt', 'updatedAt']
                    }
                })
            }
        },

        actorListById: {
            type: Actor,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            async resolve(parent, args){
                return await Actors.findOne({
                    attributes:{
                        exclude: ['createdAt', 'updatedAt']
                    }
                })
            }
        },

        actorById: {
            type: Actor,
            args: {
                id: {
                    type: GraphQLInt,
                }
            },
            async resolve(parent, { id }){
                return await Actors.findOne({
                    attributes:{
                        exclude: ['createdAt', 'updatedAt']
                    },
                    where: {
                        id: id
                    }
                })
            }
        },

        /* --------- AUTHORS ------------ */
        authorList: {
            type: new GraphQLList(Author),
            async resolve(parent, args){
                return await Authors.findAll({
                    attributes:{
                        exclude: ['createdAt', 'updatedAt']
                    }
                })
            }
        },

        authorById: {
            type: Author,
            args: {
                id: {
                    type: GraphQLInt,
                }
            },
            async resolve(parent, { id }){
                return await Authors.findOne({
                    attributes:{
                        exclude: ['createdAt', 'updatedAt']
                    },
                    where: {
                        id: id
                    }
                })
            }
        },

        userList: {
            type: new GraphQLList(userAll),
            async resolve() {
                return await User.findAll({
                    attributes: ['username', 'email', 'token']
                })
            }
        }

    })
})

const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        /* Login */
        registerUser : {
            type: AuthPayloadType,
            args: {
                username:{
                    type : GraphQLString
                },
                email: {
                    type : GraphQLString
                },
                password: {
                    type : GraphQLString
                }
            },
            async resolve(parent, {username, email, password}){
                let message = 'User registered failed'
                const result = await User.create({
                        username: username,
                        email: email,
                        password: await bcrypt.hash(password, 10)
                    }).then(async() => {
                        const token = generateToken(email, username)
                        
                        await User.update({ token: token }, {
                            where: {
                              username: username,
                              email: email
                            }
                          }).catch(err => console.log(err));
                        
                        return {
                            token,
                            user:{
                                username,
                                email
                            },
                            message: 'User registered successfuly'
                        }
                    }).catch(err => {
                        return {
                            user:{
                                username,
                                email
                            },
                            message: message
                        }                      
                    })
                    
                return result                    
            }
        },

        /* Movies */
        addMovie: {
            type: ChangeLoadMovie,
            args: {
                data : {
                    type: new GraphQLInputObjectType({
                        name: 'movieAdd',
                        fields: {
                            title: {
                                type: GraphQLString,
                            },
                            genre: {
                                type: GraphQLString,
                            },
                            desc: {
                                type: GraphQLString,
                            },
                            ActorId: {
                                type: GraphQLString,
                            },
                            AuthorId: {
                                type: GraphQLString,
                            }
                        }
                    })
                }
            },
            async resolve(parent, {data}){
                let msg =  "Failed to Insert"
                console.log(data);
                
                if(data){
                    const result = await Movie.create(data).then(() =>{
                        return true
                    }).catch((err) => {
                        console.log(err);
                        
                        return false
                    });    

                    if(result) {
                        msg = "Insert Movie Successfully"
                    }
                    
                    return {
                        movie:{
                            title: data.title,
                            genre: data.genre,
                            desc: data.desc,
                        },
                        message: msg
                    }
                }
            }
        },
        updateMovie: {
            type: ChangeLoadMovie,
            args: {
                id: {
                    type: GraphQLInt
                },
                value: {
                    type: new GraphQLInputObjectType({
                        name: 'MovieUpdate',
                        fields: {
                            title: {
                                type: GraphQLString,
                            },
                            desc: {
                                type: GraphQLString,
                            },
                            genre: {
                                type: GraphQLString,
                            },
                            AuthorId: {
                                type: GraphQLString,
                            },
                            ActorId: {
                                type: GraphQLString,
                            }
                        }
                    })
                }
            },
            async resolve(parent, {id, value}){
                const result = await Movie.update(value, {
                    where: {
                        id: id
                    }
                })

                const selectUpdate = await Movie.findOne({
                    where:{
                        id: id
                    },
                    raw: true
                })

                const data = JSON.parse(JSON.stringify(selectUpdate, null, 2))     
                
                console.log(data);
                
                
                return {
                    movie:{
                        id: data.id,
                        title: data.title,
                        genre: data.genre
                    },
                    message: "Update Successfully"
                }
            }
        },

        /* Author */
        addAuthor: {
            type: ChangeLoadAuthor,
            args: {
                data : {
                    type: new GraphQLInputObjectType({
                        name: 'authorAdd',
                        fields: {
                            name: {
                                type: GraphQLString
                            },
                            age: {
                                type: GraphQLString
                            },
                            address: {
                                type: GraphQLString
                            }
                        }
                    })
                }
            },
            async resolve(parent, {data}){
                let msg =  "Failed to Insert"
                if(data){
                    const result = await Authors.create(data).then(() =>{
                        return true
                    }).catch((err) => {
                        return false
                    });    

                    if(result) {
                        msg = "Insert Author Successfully"
                    }
                    
                    return {
                        author:{
                            name: data.name,
                            age: data.age,
                            address: data.address
                        },
                        message: msg
                    }
                }
            }
        },
        updateAuthorById: {
            type: ChangeLoadAuthor,
            args: {
                id: {
                    type: GraphQLInt
                },
                value: {
                    type: new GraphQLInputObjectType({
                        name: 'AuthorValue',
                        fields: {
                            name: { 
                                type: GraphQLString
                            },
                            age: { 
                                type: GraphQLString 
                            },
                            address: { 
                                type: GraphQLString 
                            },
                        }
                    })
                }
            },
            async resolve(parent, {id, value}) {
                const result = await Authors.update(value, {
                    where: {
                        id: id
                    }
                })

                const selectUpdate = await Authors.findOne({
                    where:{
                        id: id
                    },
                    raw: true
                })

                const data = JSON.parse(JSON.stringify(selectUpdate, null, 2))                
                
                return {
                    author:{
                        name: data.name,
                        age: data.age,
                        address: data.address,
                    },
                    message: "Update Successfully"
                }
            }

        },
        deleteAuthor: {
            type: ChangeLoadAuthor,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            async resolve(parent, { id }){
                Authors.destroy({
                    where: {
                        id: id
                    }
                })

                return {
                    message: "Deleted Successfully"
                }                
            }
        }, 

        /* Actor */
        addActor: {
            type: ChangeLoadActor,
            args: {
                name: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLString
                },
                address: {
                    type: GraphQLString
                }
            },
            async resolve(parent, {name, age, address}){
                if(name && age && address){
                    const result = await Actors.create({
                        name: name,
                        age: age,
                        address: address
                    }).then(() =>{
                        return {
                            actor:{
                                name,
                                age,
                                address
                            },
                            message: "Successfully"
                        }
                    }).catch(() => {
                        return {
                            message: "Failed to Insert"
                        }
                    });                    

                    return result
                }
            }
        },
        updateActorById: {
            type: ChangeLoadActor,
            args: {
                id: {
                    type: GraphQLInt
                },
                value: {
                    type: new GraphQLInputObjectType({
                        name: 'ActorValue',
                        fields: {
                            name: { 
                                type: GraphQLString
                            },
                            age: { 
                                type: GraphQLString 
                            },
                            address: { 
                                type: GraphQLString 
                            },
                        }
                    })
                }
            },
            async resolve(parent, {id, value}) {
                const result = await Actors.update(value, {
                    where: {
                        id: id
                    }
                })

                console.log(result);

                const selectUpdate = await Actors.findOne({
                    where:{
                        id: id
                    },
                    raw: true
                })

                const data = JSON.parse(JSON.stringify(selectUpdate, null, 2))                
                
                return {
                    actor:{
                        name: data.name,
                        age: data.age,
                        address: data.address,
                    },
                    message: "Update Successfully"
                }
            }

        },
        deleteActor: {
            type: ChangeLoadActor,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            async resolve(parent, { id }){
                Actors.destroy({
                    where: {
                        id: id
                    }
                })

                return {
                    message: "Deleted Successfully"
                }                
            }
        }  
    },
})

export default new GraphQLSchema({
    query: rootQuery,
    mutation: Mutations
})