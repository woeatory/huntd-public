import fetch from 'node-fetch';
import { Translate } from '@/models/Translate';
import { translateFactory } from '@/modules/translate/translate.testUtils/Translate.factory';
import { getHost } from '@/test/test.helpers';
import { testFactory } from '@/test/testFactory';

describe('Test endpoint: /rest/translates', testFactory(() => {
  let path = '';
  let translate: Translate;

  beforeAll(async () => {
    path = `${getHost(global.port)}/rest/translates`;
    translate = await translateFactory();
  });

  it('Should fetch translate by language and namespace', async () => {
    const response = await fetch(`${path}?lang=${translate.language}&namespace=${translate.namespace}`);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result[translate.code]).toBe(translate.value);
  });

  it('Should throw validation error for required fields', async () => {
    const response = await fetch(`${path}`);
    const result = await response.json();

    expect(response.status).toBe(400);

    expect(result.validation).toMatchObject({
      lang: 'REQUIRED',
      namespace: 'REQUIRED',
    });
  });
}));
