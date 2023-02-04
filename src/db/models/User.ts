import { DataTypes, Model, Optional} from 'sequelize'
import connection from '../../config/dbConnect'

interface UserAttributes {
  id?: number,
  username?: string,
  password?: string,
  email?: string,
  token?: string

  createAt?: Date,
  updateAt?: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'>{ }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number
  public username!: string
  public password!: string
  public email!: string
  public token!: string

  public readonly createAt!: Date
  public readonly updateAt!: Date
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  token: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
})

export default User