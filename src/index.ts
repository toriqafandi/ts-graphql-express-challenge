import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema'
import * as jwt from 'jsonwebtoken';

const app = express();
const validationMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.sendStatus(401);
    console.log(token); 

    jwt.verify(
        token, 
        'telopendem', 
        (err, decode)=>{
            if(err) return res.sendStatus(401)
            next();
        }
    )
}

// app.use(validationMiddleware)

app.use('/graphql', validationMiddleware, graphqlHTTP({
    schema,
    graphiql:false
}))

app.use('/graphiql', graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(3000, ()=>{
    console.log(`Listening port 3000`);
})