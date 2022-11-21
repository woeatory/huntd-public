import { AnyObject } from '@/core/typedefs';

export async function factoryUpsert(
  this: any,
  name: string,
  where: AnyObject,
  attrs: AnyObject,
  buildOptions: AnyObject = {},
) {
  let entity = await this.getFactory(name)
    .Model.findOne({
      where,
    });

  if (entity) {
    await entity.update({ ...attrs });
  } else {
    entity = await this.create(name, attrs, buildOptions);
  }

  return entity;
}
