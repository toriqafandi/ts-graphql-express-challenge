import * as jwt from 'jsonwebtoken';

const generateToken = (email:string, username:string) => {
    return jwt.sign({email, username}, 'telopendem', {expiresIn: '1d'})
}

export default generateToken 