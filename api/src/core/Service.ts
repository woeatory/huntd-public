import { BaseService, BaseServiceConstructorOptions } from '@mate-academy/core';
import { Sequelize } from 'sequelize-typescript';
import { Models } from '@/models';
import { DataLoaders } from '@/modules/dataLoaders';
import { PubSub } from '@/modules/pubSub/PubSub.typedefs';
import { UserWithToken } from '@/modules/user/user.typedefs';
import { User } from '@/models/User';
import { Repository, RepositoryConstructor } from '@/core/Repository';
import { Gateways } from '@/core/UseCase';
import { FeaturesTool } from '@/modules/feature/initFeatures';

interface ServiceConstructorOptions extends BaseServiceConstructorOptions {
  models: Models,
  gateways: Gateways,
  dataLoaders: DataLoaders,
  pubSub: PubSub,
  db: Sequelize,
  authUser: UserWithToken | null;
  adminUser: UserWithToken | null;
  serviceUser: User | null;
  features: FeaturesTool;
}

export interface ServiceConstructor<T extends Service> {
  new (options: ServiceConstructorOptions): T;
}

export class Service extends BaseService {
  protected readonly models: Models;

  protected readonly gateways: Gateways;

  protected readonly dataLoaders: DataLoaders;

  protected readonly pubSub: PubSub;

  protected readonly db: Sequelize;

  protected readonly authUser: UserWithToken | null;

  protected readonly adminUser: UserWithToken | null;

  protected readonly serviceUser: User | null;

  protected readonly features: FeaturesTool;

  constructor(options: ServiceConstructorOptions) {
    super(options);

    this.models = options.models;
    this.gateways = options.gateways;
    this.dataLoaders = options.dataLoaders;
    this.pubSub = options.pubSub;
    this.db = options.db;
    this.authUser = options.authUser;
    this.adminUser = options.adminUser;
    this.serviceUser = options.serviceUser;
    this.features = options.features;
  }

  protected makeRepository<T extends Repository>(
    ConstructorClass: RepositoryConstructor<T>,
  ): T {
    return new ConstructorClass({
      dataLoaders: this.dataLoaders,
      models: this.models,
      db: this.db,
      pubSub: this.pubSub,
      logger: this.logger,
      features: this.features,
    });
  }

  protected makeService<T extends Service>(
    ConstructorClass: ServiceConstructor<T>,
  ): T {
    return new ConstructorClass({
      dataLoaders: this.dataLoaders,
      models: this.models,
      gateways: this.gateways,
      db: this.db,
      pubSub: this.pubSub,
      logger: this.logger,
      adminUser: this.adminUser,
      authUser: this.authUser,
      serviceUser: this.serviceUser,
      features: this.features,
    });
  }
}

export abstract class AuthService extends Service {
  authUser: UserWithToken;
}
