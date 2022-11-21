import { IconBadge } from '@/ui/icons/general/IconBadge';
import { IconGem } from '@/ui/icons/general/IconGem';
import { IconGlobe } from '@/ui/icons/general/IconGlobe';
import { IconZero } from '@/ui/icons/general/IconZero';
import { FCIcon } from '@/ui/icons/typedefs';

interface Reason {
  Icon: FCIcon
  title: string;
  description: string;
}

export const REASONS_LIST: Reason[] = [
  {
    Icon: IconGem,
    title: 'real_hiring_gems_title',
    description: 'real_hiring_gems_description',
  },
  {
    Icon: IconBadge,
    title: 'real_hiring_quality_title',
    description: 'real_hiring_quality_description',
  },
  {
    Icon: IconZero,
    title: 'real_hiring_zero_risk_title',
    description: 'real_hiring_zero_risk_description',
  },
  {
    Icon: IconGlobe,
    title: 'real_hiring_talent_pool_title',
    description: 'real_hiring_talent_pool_description',
  },
];
