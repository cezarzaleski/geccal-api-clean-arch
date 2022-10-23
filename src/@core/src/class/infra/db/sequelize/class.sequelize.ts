import { Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { NotFoundError, UniqueEntityId } from '#shared/domain';
import { ClassRepository, EvangelizandoId } from '#class/domain';
import Class from '#class/domain/entities/class';
import Ciclo from '#class/domain/entities/ciclo.vo';
import { EvangelizandoSequelize } from '#class/infra/db/sequelize/evangelizando.sequelize';
import Enrollment from '#class/domain/entities/enrollment';

export namespace ClassSequelize {
  import EvangelizandoModel = EvangelizandoSequelize.EvangelizandoModel;
  type ClassModelProperties = {
    id: string;
    startAt: Date;
    finishAt: Date;
    enrollments: EnrollmentModelProperties[];
    year: number;
    ciclo: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }

  type EnrollmentModelProperties = {
    id: string;
    evangelizandoId: string;
    classId: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }

  @Table({tableName: 'enrollments', timestamps: false})
  export class EnrollmentModel extends Model<EnrollmentModelProperties> {
    @PrimaryKey
    @Column({allowNull: false, type: DataType.UUID})
    declare id: string;

    @ForeignKey(() => EvangelizandoModel)
    @Column({ allowNull: false, type: DataType.UUID,  field: 'evangelizando_id' })
    declare evangelizandoId: string;

    @ForeignKey(() => ClassModel)
    @Column({ allowNull: false, type: DataType.UUID, field: 'class_id' })
    declare classId: string;

    @Column({allowNull: false, type: DataType.DATE, field: 'created_at'})
    declare createdAt: Date;

    @Column({type: DataType.DATE, field: 'updated_at'})
    declare updatedAt: Date | null;

    @Column({type: DataType.DATE, field: 'deleted_at'})
    declare deletedAt: Date | null;
  }

  @Table({tableName: 'classes', timestamps: false})
  export class ClassModel extends Model<ClassModel> {
    @PrimaryKey
    @Column({allowNull: false, type: DataType.UUID})
    declare id: string;

    @Column({allowNull: false, type: DataType.DATE, field: 'start_at'})
    declare startAt: Date;

    @Column({allowNull: false, type: DataType.DATE, field: 'finish_at'})
    declare finishAt: Date;

    @Column({allowNull: false, type: DataType.NUMBER, field: 'year'})
    declare year: number;

    @Column({allowNull: false, type: DataType.STRING, field: 'ciclo'})
    declare ciclo: string;

    @HasMany(() => EnrollmentModel)
    declare enrollments: unknown[];

    @Column({allowNull: false, type: DataType.DATE, field: 'created_at'})
    declare createdAt: Date;

    @Column({type: DataType.DATE, field: 'updated_at'})
    declare updatedAt: Date | null;

    @Column({type: DataType.DATE, field: 'deleted_at'})
    declare deletedAt: Date | null;
  }

  export class Repository implements ClassRepository.Repository {
    sortableFields: string[] = ['ciclo', 'createdAt'];

    constructor(private classModel: typeof ClassSequelize.ClassModel) {
    }
    async delete(id: string | UniqueEntityId, deletedAt: Date = new Date()): Promise<void> {
      const _id = `${id}`;
      const model = await this._get(_id);
      await this.classModel.update({...model, deletedAt}, {
        where: {id: _id},
      });
    }

    findAll(): Promise<Class[]> {
      return Promise.resolve([]);
    }

    async findById(id: string | UniqueEntityId): Promise<Class> {
      const _id = `${id}`;
      const model = await this._get(_id);
      return ClassModelMapper.toEntity(model);
    }

    async insert(entity: Class): Promise<void> {
      await this.classModel.create(ClassModelMapper.toModel(entity), {
        include: [{model: EnrollmentModel}]
      });
    }

    async update(entity: Class): Promise<void> {
      await this._get(entity.id);
      const sequelize = this.classModel.sequelize
      await sequelize.transaction(async (t) => {
        await EnrollmentModel.destroy({
          where: {classId: entity.id},
          transaction: t
        })
        const classModel = ClassModelMapper.toModel(entity)
        await EnrollmentModel.bulkCreate(classModel.enrollments, {transaction: t});
        await this.classModel.update(classModel, {
          where: {id: entity.id},
          transaction: t
        });
      })
    }

    search(props: ClassRepository.SearchParams): Promise<ClassRepository.SearchResult> {
      return Promise.resolve(undefined);
    }

    private async _get(id: string): Promise<ClassModel> {
      return this.classModel.findOne({
        where: {deletedAt: null, id: id},
        include: ["enrollments"],
        rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`),
      });
    }
  }

  export class ClassModelMapper {
    static toEntity(model: ClassModel): Class {
      return Class.with({
        id: new UniqueEntityId(model.id),
        startAt: model.startAt,
        finishAt: model.finishAt,
        year: model.year,
        ciclo: Ciclo.from(model.ciclo),
        enrollments: model.enrollments?.map((it) => EnrollmentModelMapper.toEntity(it as EnrollmentModel)),
        createdAt: model.createdAt,
        updateAt: model.updatedAt,
        deletedAt: model.deletedAt
      });
    }

    static toModel(entity: Class): ClassModelProperties {
      return {
        id: entity.id,
        startAt: entity.startAt,
        finishAt: entity.finishAt,
        year: entity.year,
        ciclo: entity.ciclo.value,
        enrollments: entity.enrollments?.map(it => EnrollmentModelMapper.toModel(it, entity.id)),
        createdAt: entity.createdAt,
        updatedAt: entity.createdAt,
        deletedAt: entity.deletedAt,
      }
    }
  }

    export class EnrollmentModelMapper {
    static toEntity(model: EnrollmentModel): Enrollment {
      return Enrollment.from({
        evangelizandoId: new EvangelizandoId(model.evangelizandoId),
        createAt: model.createdAt,
      });
    }
    static toModel(entity: Enrollment, classId: string): EnrollmentModelProperties {
      return {
        deletedAt: undefined,
        id: new UniqueEntityId().value,
        evangelizandoId: entity.evangelizandoId.id,
        classId: classId,
        createdAt: entity.createdAt,
        updatedAt: entity.createdAt
      }
    }
  }
}
