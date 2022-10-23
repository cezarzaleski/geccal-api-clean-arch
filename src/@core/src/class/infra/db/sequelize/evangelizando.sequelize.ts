import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { NotFoundError, UniqueEntityId } from '#shared/domain';
import { EvangelizandoRepository } from '#class/domain';
import Evangelizando from '#class/domain/entities/evangelizando';
import Gender from '#class/domain/entities/gender.vo';

export namespace EvangelizandoSequelize {
  type EvangelizandoModelProperties = {
    id: string;
    name: string;
    gender: string;
    fatherName?: string;
    motherName?: string;
    birthday?: Date;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }

  @Table({tableName: 'evangelizandos', timestamps: false})
  export class EvangelizandoModel extends Model<EvangelizandoModelProperties> {
    @PrimaryKey
    @Column({allowNull: true, type: DataType.UUID})
    declare id: string;

    @Column({allowNull: false, type: DataType.STRING(255)})
    declare name: string;

    @Column({allowNull: false, type: DataType.STRING(10)})
    declare gender: string;

    @Column({allowNull: true, type: DataType.STRING(255), field: 'father_name'})
    declare fatherName: string | null;

    @Column({allowNull: true, type: DataType.STRING(255), field: 'mother_name'})
    declare motherName: string | null;

    @Column({allowNull: true, type: DataType.DATE, field: 'birthday'})
    declare birthday: Date | null;

    @Column({allowNull: false, type: DataType.DATE, field: 'created_at'})
    declare createdAt: Date;

    @Column({type: DataType.DATE, field: 'updated_at'})
    declare updatedAt: Date | null;

    @Column({type: DataType.DATE, field: 'deleted_at'})
    declare deletedAt: Date | null;
  }

  export class Repository implements EvangelizandoRepository.Repository {
    sortableFields: string[] = ['name', 'createdAt'];

    constructor(private evangelizandoModel: typeof EvangelizandoSequelize.EvangelizandoModel) {
    }
    async delete(id: string | UniqueEntityId, deletedAt: Date = new Date()): Promise<void> {
      const _id = `${id}`;
      const model = await this._get(_id);
      await this.evangelizandoModel.update({...model, deletedAt}, {
        where: {id: _id},
      });
    }

    findAll(): Promise<Evangelizando[]> {
      return Promise.resolve([]);
    }

    async findById(id: string | UniqueEntityId): Promise<Evangelizando> {
      const _id = `${id}`;
      const model = await this._get(_id);
      return EvangelizandoModelMapper.toEntity(model);
    }

    async insert(entity: Evangelizando): Promise<void> {
      await this.evangelizandoModel.create(EvangelizandoModelMapper.toModel(entity));
    }

    async update(entity: Evangelizando): Promise<void> {
      await this._get(entity.id);
      await this.evangelizandoModel.update(EvangelizandoModelMapper.toModel(entity), {
        where: {id: entity.id},
      });
    }

    search(props: EvangelizandoRepository.SearchParams): Promise<EvangelizandoRepository.SearchResult> {
      return Promise.resolve(undefined);
    }

    private async _get(id: string): Promise<EvangelizandoModel> {
      return this.evangelizandoModel.findOne({
        where: {deletedAt: null, id: id},
        rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`),
      });
    }
  }

  export class EvangelizandoModelMapper {
    static toEntity(model: EvangelizandoModel): Evangelizando {
      return Evangelizando.with({
        id: new UniqueEntityId(model.id),
        name: model.name,
        gender: Gender.from(model.gender),
        fatherName: model.fatherName,
        motherName: model.motherName,
        birthday: model.birthday,
        createdAt: model.createdAt,
        updateAt: model.updatedAt,
        deletedAt: model.deletedAt
      });
    }
    static toModel(entity: Evangelizando): EvangelizandoModelProperties {
      return {
        id: entity.id,
        name: entity.name,
        gender: entity.gender.value,
        fatherName: entity.fatherName,
        motherName: entity.motherName,
        birthday: entity.birthday,
        createdAt: entity.createdAt,
        updatedAt: entity.createdAt,
        deletedAt: entity.deletedAt,
      }
    }
  }
}
