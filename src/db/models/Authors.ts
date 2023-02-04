import { DataTypes, Model, Optional} from 'sequelize'
import connection from '../../config/dbConnect'

interface AuthorsAttributes {
  id?: number,
  name?: string,
  age?: string,
  address?: string

  createAt?: Date,
  updateAt?: Date
}

export interface AuthorsInput extends Optional<AuthorsAttributes, 'id'>{ }
export interface AuthorsOutput extends Required<AuthorsAttributes> { }

class Authors extends Model<AuthorsAttributes, AuthorsInput> implements AuthorsAttributes {
  public id!: number
  public name!: string
  public age!: string
  public address!: string

  public readonly createAt!: Date
  public readonly updateAt!: Date
}

Authors.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
})

export default Authors