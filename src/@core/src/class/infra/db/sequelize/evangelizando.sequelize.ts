import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { UniqueEntityId } from '#shared/domain';
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

  @Table({tableName: 'books', timestamps: false})
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

    delete(id: string | UniqueEntityId): Promise<void> {
      return Promise.resolve(undefined);
    }

    findAll(): Promise<Evangelizando[]> {
      return Promise.resolve([]);
    }

    findById(id: string | UniqueEntityId): Promise<Evangelizando> {
      return Promise.resolve(undefined);
    }

    async insert(entity: Evangelizando): Promise<void> {
      await this.evangelizandoModel.create(EvangelizandoModelMapper.toModel(entity));
    }

    update(entity: Evangelizando): Promise<void> {
      return Promise.resolve(undefined);
    }

    search(props: EvangelizandoRepository.SearchParams): Promise<EvangelizandoRepository.SearchResult> {
      return Promise.resolve(undefined);
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
