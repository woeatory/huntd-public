import { QueueEvent, QueueEventTypes } from '@/core/queue';

export interface GetSingleSourceVacanciesParams {
  id: number;
  userId: number;
  url: string;
  companyName?: string;
  salaryFrom?: number;
  salaryTo?: number;
}

export type GetSingleSourceVacanciesEvent = QueueEvent<
  QueueEventTypes.GetSingleSourceVacancies,
  GetSingleSourceVacanciesParams
>;

export type AtsParserEvents = GetSingleSourceVacanciesEvent;
