/* eslint-disable camelcase */
import fetch from 'node-fetch';
import { Service } from '@/core/Service';
import { VacanciesSourcesRepository } from '@/modules/vacanciesSource/vacanciesSource.repository';
import { ATSUrlsMap, ATSUrlTypes, ATS_ID_PLACEHOLDER } from './vacanciesSource.typedefs';

export class VacancySourceService extends Service {
  private readonly vacanciesSourceRepository = this.makeRepository(
    VacanciesSourcesRepository,
  )

  async checkUrlValidity(url: string) {
    let response;
    let isOk = true;

    try {
      response = await fetch(url);

      isOk = response.ok;
    } catch (e) {
      isOk = false;
    }

    return isOk;
  }

  getVacanciesSourceUrl(type: ATSUrlTypes, atsId: string) {
    return ATSUrlsMap[type].replace(ATS_ID_PLACEHOLDER, atsId);
  }
}
