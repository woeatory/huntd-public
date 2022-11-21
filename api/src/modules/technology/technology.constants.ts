interface Fields {
  name: any
  id: any
  deletedAt: any
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export type WhereObject = PartialRecord<keyof Fields, any>[]
