import { DataTypes, Model, Optional} from 'sequelize'
import connection from '../../config/dbConnect'

interface ActorsAttributes {
  id?: number,
  name?: string,
  age?: string,
  address?: string

  createAt?: Date,
  updateAt?: Date
}

export interface ActorsInput extends Optional<ActorsAttributes, 'id'>{ }
export interface ActorsOutput extends Required<ActorsAttributes> { }

class Actors extends Model<ActorsAttributes, ActorsInput> implements ActorsAttributes {
  public id!: number
  public name!: string
  public age!: string
  public address!: string

  public readonly createAt!: Date
  public readonly updateAt!: Date
}

Actors.init({
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

export default Actors