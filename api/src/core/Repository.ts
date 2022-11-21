import {
  BaseRepository,
  BaseRepositoryConstructorOptionsOptions,
} from '@mate-academy/core';
import { Sequelize } from 'sequelize-typescript';
import { Models } from '@/models';
import { DataLoaders } from '@/modules/dataLoaders';
import { PubSub } from '@/modules/pubSub/PubSub.typedefs';
import { FeaturesTool } from '@/modules/feature/initFeatures';

interface RepositoryConstructorOptions
  extends BaseRepositoryConstructorOptionsOptions {
  models: Models,
  dataLoaders: DataLoaders,
  pubSub: PubSub,
  db: Sequelize,
  features: FeaturesTool,
}

export interface RepositoryConstructor<T extends Repository> {
  new (options: RepositoryConstructorOptions): T;
}

export class Repository extends BaseRepository {
  protected readonly models: Models;

  protected readonly dataLoaders: DataLoaders;

  protected readonly pubSub: PubSub;

  protected readonly db: Sequelize;

  protected readonly features: FeaturesTool;

  constructor(options: RepositoryConstructorOptions) {
    super(options);

    this.models = options.models;
    this.dataLoaders = options.dataLoaders;
    this.pubSub = options.pubSub;
    this.db = options.db;
    this.features = options.features;
  }
}
