import { factoryLib } from '@/test/factory/factoryLib';

export interface MateFactory<T, O = void> {
  attrs(override?: Partial<T>, buildOptions?: O): Promise<T>;
  attrsMany(
    count: number,
    override?: Partial<T> | Partial<T>[],
    buildOptions?: O | O[],
  ): Promise<T[]>;
  attrsMany(
    override: Partial<T>[],
    buildOptions?: O | O[],
  ): Promise<T[]>;
  build(override?: Partial<T>, buildOptions?: O): Promise<T>;
  buildMany(
    count: number,
    override?: Partial<T> | Partial<T>[],
    buildOptions?: O | O[],
  ): Promise<T[]>;
  buildMany(
    override: Partial<T>[],
    buildOptions?: O | O[],
  ): Promise<T[]>;
  create(override?: Partial<T>, buildOptions?: O): Promise<T>;
  createMany(
    count: number,
    override?: Partial<T> | Partial<T>[],
    buildOptions?: O | O[],
  ): Promise<T[]>;
  createMany(
    override: Partial<T>[],
    buildOptions?: O | O[],
  ): Promise<T[]>;
  upsert(
    where: Partial<T>,
    override?: Partial<T>,
    buildOptions?: O
  ): Promise<T>;
}

export function makeFactory<T, O = void>(name: string): MateFactory<T, O> {
  return {
    attrs(override?: Partial<T>, buildOptions?: O): Promise<T> {
      return factoryLib.attrs(name, override, buildOptions);
    },
    attrsMany(
      count: number | Partial<T>[],
      override?: Partial<T> | Partial<T>[] | O | O[],
      buildOptions?: O | O[],
    ): Promise<T[]> {
      return factoryLib.attrsMany(name, count, override, buildOptions);
    },
    build(override?: Partial<T>, buildOptions?: O): Promise<T> {
      return factoryLib.build(name, override, buildOptions);
    },
    buildMany(
      count: number | Partial<T>[],
      override?: Partial<T> | Partial<T>[] | O | O[],
      buildOptions?: O | O[],
    ): Promise<T[]> {
      return factoryLib.buildMany(name, count, override, buildOptions);
    },
    create(override?: Partial<T>, buildOptions?: O): Promise<T> {
      return factoryLib.create(name, override, buildOptions);
    },
    createMany(
      count: number | Partial<T>[],
      override?: Partial<T> | Partial<T>[] | O | O[],
      buildOptions?: O | O[],
    ): Promise<T[]> {
      return factoryLib.createMany(name, count, override, buildOptions);
    },
    upsert(where: Partial<T>, override?: Partial<T>, buildOptions?: O) {
      return factoryLib.upsert(name, where, override, buildOptions);
    },
  };
}
