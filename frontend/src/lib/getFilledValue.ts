import { ProfileItemContent } from '@/controllers/profile/profile.constants';

export const getFilledValue = (
  str?: string | null,
) => str ?? ProfileItemContent.Empty;
