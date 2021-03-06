import { Column, PrimaryKey, DataType, Table, Model } from "sequelize-typescript"

type BookModelProperties = {
  id: string;
  name: string;
  exemplary: number | null;
  status: string;
  edition: string | null;
  note: string | null;
  publisherId: string;
  authors: Array<string>;
  origin: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

@Table({ tableName: 'books', timestamps: false })
export class BookModel extends Model<BookModelProperties> {
  @PrimaryKey
  @Column({allowNull: true, type: DataType.UUID})
  declare id: string;

  @Column({allowNull: false, type: DataType.STRING(255)})
  declare name: string;

  @Column({type: DataType.STRING(255)})
  declare exemplary: number | null;

  @Column({allowNull: false, type: DataType.STRING})
  declare status: string;

  @Column({type: DataType.STRING})
  declare edition: string | null;

  @Column({type: DataType.STRING})
  declare note: string | null;

  @Column({allowNull: false, type: DataType.UUID, field: 'publisher_id'})
  declare publisherId: string;

  @Column({allowNull: false, type: DataType.JSON})
  declare authors: Array<string>;

  @Column({allowNull: false, type: DataType.STRING})
  declare origin: string;

  @Column({allowNull: false, type: DataType.DATE, field: 'created_at'})
  declare createdAt: Date;

  @Column({type: DataType.DATE, field: 'updated_at'})
  declare updatedAt: Date | null;

  @Column({type: DataType.DATE, field: 'deleted_at'})
  declare deletedAt: Date | null;
}