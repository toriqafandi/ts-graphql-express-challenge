import { DataTypes, Model, Optional} from 'sequelize'
import connection from '../../config/dbConnect'

interface MovieAttributes {
  id?: number,
  title?: string,
  desc?: string,
  genre?: string,
  AuthorId?: string
  ActorId?: string

  createAt?: Date,
  updateAt?: Date
}

export interface MovieInput extends Optional<MovieAttributes, 'id'>{ }
export interface MovieOutput extends Required<MovieAttributes> { }

class Movie extends Model<MovieAttributes, MovieInput> implements MovieAttributes {
  public id!: number
  public title!: string
  public desc!: string
  public genre!: string
  public AuthorId!: string
  public ActorId!: string

  public readonly createAt!: Date
  public readonly updateAt!: Date
}

Movie.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },
  desc: {
    type: DataTypes.STRING
  },
  genre: {
    type: DataTypes.STRING
  },
  AuthorId: {
    type: DataTypes.STRING,
  },
  ActorId: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
})

export default Movie