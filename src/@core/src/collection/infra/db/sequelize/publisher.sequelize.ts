import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"
import { Publisher, PublisherRepository } from '#collection/domain';
import { NotFoundError, UniqueEntityId } from '#shared/domain';

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

    async delete(id: string | UniqueEntityId, deletedAt: Date = new Date()): Promise<void> {
      const _id = `${id}`;
      const model = await this._get(_id);
      await this.publisherModel.update({...model, deletedAt}, {
        where: {id: _id},
      });
    }

    findAll(): Promise<Publisher[]> {
      return Promise.resolve([]);
    }

    async findById(id: string | UniqueEntityId): Promise<Publisher> {
      const _id = `${id}`;
      const model = await this._get(_id);
      return PublisherModelMapper.toEntity(model);
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

    private async _get(id: string): Promise<PublisherModel> {
      return this.publisherModel.findOne({
        where: {deletedAt: null, id: id},
        rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`),
      });
    }
  }

  export class PublisherModelMapper {
    static toEntity(model: PublisherModel): Publisher {
      const {id, name, createdAt, updatedAt, deletedAt} = model
      const publisherId =  new UniqueEntityId(id)
      return Publisher.with(publisherId, name, createdAt, updatedAt, deletedAt);
    }
    static toModel(entity: Publisher): unknown {
      return {
        id: entity.id,
        name: entity.name,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: entity.deletedAt
      }
    }
  }
}
