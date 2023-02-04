# ts-graphql-express-challenge
Typescrypt GraphQL Express API


# Enpoint
 for Postman with Middleware
 - /grapql

 for GraphiQL interface
 - /graphiql

# Database
    - postgresql

# Example Payload
   mutation{
    updateMovie(id: 5, value:{
        title: "Upin & Ipin"
        AuthorId: "2"
    }){
        movie{
        title
        genre
        }
        message
    }
  }

  Query 
  {
    actorList{
        id
        name
        age,
        address,
        movie {
        title
        genre
        author
        desc
        }
    }
  }