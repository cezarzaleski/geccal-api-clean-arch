import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"
import { Publisher, PublisherRepository } from '#collection/domain';
import { UniqueEntityId } from '#shared/domain';

export namespace PublisherSequelize {

  type PublisherModelProperties = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }

  @Table({tableName: 'publishers', timestamps: false})
  export class PublisherModel extends Model<PublisherModelProperties> {
    @PrimaryKey
    @Column({allowNull: true, type: DataType.UUID})
    declare id: string;

    @Column({allowNull: false, type: DataType.STRING(255)})
    declare name: string;

    @Column({allowNull: false, type: DataType.DATE, field: 'created_at'})
    declare createdAt: Date;

    @Column({type: DataType.DATE, field: 'updated_at'})
    declare updatedAt: Date | null;

    @Column({type: DataType.DATE, field: 'deleted_at'})
    declare deletedAt: Date | null;
  }

  export class Repository implements PublisherRepository.Repository {
    sortableFields: string[] = ['name', 'createdAt'];

    constructor(private publisherModel: typeof PublisherSequelize.PublisherModel) {
    }

    delete(id: string | UniqueEntityId): Promise<void> {
      return Promise.resolve(undefined);
    }

    findAll(): Promise<Publisher[]> {
      return Promise.resolve([]);
    }

    findById(id: string | UniqueEntityId): Promise<Publisher> {
      return Promise.resolve(undefined);
    }

    async insert(entity: Publisher): Promise<void> {
      await this.publisherModel.create(PublisherModelMapper.toModel(entity));
    }

    update(entity: Publisher): Promise<void> {
      return Promise.resolve(undefined);
    }

    search(props: PublisherRepository.SearchParams): Promise<PublisherRepository.SearchResult> {
      return Promise.resolve(undefined);
    }
  }

  export class PublisherModelMapper {
    static toEntity(model: PublisherModel): Publisher {
      const {id, name, createdAt, updatedAt, deletedAt} = model
      const publisherId =  new UniqueEntityId(id)
      return Publisher.with(name, publisherId, createdAt, updatedAt, deletedAt);
    }
    static toModel(entity: Publisher): unknown {
      return {
        id: entity.id,
        name: entity.name,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: undefined
      }
    }
  }
}
