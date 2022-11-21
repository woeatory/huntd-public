import { Sequelize } from 'sequelize-typescript';
import { ValidationError } from 'sequelize';
import { BaseUseCase, BaseUseCaseCtx } from '@mate-academy/core';
import { Models } from '@/models';
import { FeaturesTool } from '@/modules/feature/initFeatures';
import { User } from '@/models/User';
import { UserWithToken } from '@/modules/user/user.typedefs';
import { DataLoaders } from '@/modules/dataLoaders';
import { PubSub } from '@/modules/pubSub/PubSub.typedefs';
import { Analytics } from '@/core/Analytics';
import { Repository, RepositoryConstructor } from '@/core/Repository';
import { Service, ServiceConstructor } from '@/core/Service';
import { Queue } from '@/core/queue/Queue';
import { NotificationsGatewayMock } from '@mate-academy/notifications-gateway';

export interface Gateways {
  notifications: NotificationsGatewayMock;
  // TODO: move analytics to mate-academy npm package
  analytics: Analytics;
  queue: Queue;
}

export interface UseCaseCtx extends BaseUseCaseCtx {
  db: Sequelize;
  models: Models;
  authUser: UserWithToken | null;
  adminUser: UserWithToken | null;
  features: FeaturesTool;
  serviceUser: User | null;
  gateways: Gateways;
  dataLoaders: DataLoaders;
  pubSub: PubSub;
}

export interface UseCaseConstructorOptions {
  ctx: UseCaseCtx;
}

export interface ServiceUseCaseConstructor<O, R> {
  new(constructorOptions: UseCaseConstructorOptions): ServiceUseCase<O, R>;
}

export interface AuthUseCaseConstructor<O, R> {
  new(constructorOptions: UseCaseConstructorOptions): AuthUseCase<O, R>;
}

export interface AdminUseCaseConstructor<O, R> {
  new(constructorOptions: UseCaseConstructorOptions): AdminUseCase<O, R>;
}

export interface UseCaseConstructor<O, R> {
  new(constructorOptions: UseCaseConstructorOptions): UseCase<O, R>;
}

export abstract class UseCase<O, R> extends BaseUseCase<O, R> {
  db: Sequelize;

  authUser: UserWithToken | null;

  adminUser: UserWithToken | null;

  serviceUser: User | null;

  models: Models;

  gateways: Gateways;

  features: FeaturesTool;

  dataLoaders: DataLoaders;

  pubSub: PubSub;

  constructor({ ctx }: UseCaseConstructorOptions) {
    super({ ctx });

    this.db = ctx.db;
    this.models = ctx.models;
    this.authUser = ctx.authUser;
    this.adminUser = ctx.adminUser;
    this.serviceUser = ctx.serviceUser;
    this.gateways = ctx.gateways;
    this.features = ctx.features;
    this.dataLoaders = ctx.dataLoaders;
    this.pubSub = ctx.pubSub;
  }

  logError(error: Error) {
    if (error instanceof ValidationError) {
      this.logValidationError(error);
    } else {
      super.logError(error);
    }
  }

  private logValidationError(error: ValidationError) {
    const [errorDetails] = error.errors;
    const loggerArgs = [
      errorDetails.message,
      error.stack,
    ];

    this.logger.warning(...loggerArgs);
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

export abstract class AuthUseCase<O, R> extends UseCase<O, R> {
  authUser: UserWithToken;
}

export abstract class AdminUseCase<O, R> extends UseCase<O, R> {
  adminUser: UserWithToken;
}

export abstract class ServiceUseCase<O, R> extends UseCase<O, R> {
  serviceUser: User;
}
