export enum ATSUrlTypes {
  Lever = 'LEVER',
  Greenhouse = 'GREENHOUSE',
}

export enum VacanciesSourceErrors {
  NotFound = 'no_such_ats_id',
  BadInput = 'bad_source_id',
}

export const ATS_ID_PLACEHOLDER = '__company_placeholder__';

export const ATSUrlsMap = {
  [ATSUrlTypes.Greenhouse]: `https://boards-api.greenhouse.io/v1/boards/${ATS_ID_PLACEHOLDER}/jobs?content=true`,
  [ATSUrlTypes.Lever]: `https://api.lever.co/v0/postings/${ATS_ID_PLACEHOLDER}?mode=json`,
};
