import faker from 'faker';
import { makeGetData } from '@/test/test.models/getData';
import { Translate } from '@/models/Translate';

type Props = Partial<Translate>;

const getData = makeGetData<Props>(() => ({
  code: faker.lorem.word(),
  namespace: faker.lorem.word(),
  value: faker.lorem.sentence(2),
  language: faker.random.locale(),
}));

interface TranslateFactory {
  (props?: Props): Promise<Translate>
}
export const translateFactory: TranslateFactory = async (props) => (
  Translate.create(await getData(props))
);
