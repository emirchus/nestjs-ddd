import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async findOne(
    entityFilter: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T> {
    return this.model
      .findOne(entityFilter, {
        __v: 0,
        _id: 0,
        ...projection,
      })
      .exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[]> {
    return this.model
      .find(entityFilterQuery, {
        __v: 0,
        _id: 0,
        ...projection,
      })
      .exec();
  }

  async create(entity: unknown): Promise<T> {
    const newEntity = new this.model(entity);

    return newEntity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    entityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(entityFilterQuery, entityData, {
      new: true,
    });
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deletedResult = await this.model.deleteMany(entityFilterQuery);

    return deletedResult.deletedCount > 0;
  }

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deletedResult = await this.model.deleteOne(entityFilterQuery);

    return deletedResult.deletedCount > 0;
  }
}
