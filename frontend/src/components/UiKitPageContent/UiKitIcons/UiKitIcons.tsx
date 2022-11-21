import cn from 'classnames';
import React from 'react';
import typography from '@/ui/typography/typography.module.scss';
import styles from '@/components/UiKitPageContent/UiKitPageContent.module.scss';
import { IconGithub } from '@/ui/icons/social/IconGithub';
import { IconLinkedin } from '@/ui/icons/social/IconLinkedin';
import { IconGoogle } from '@/ui/icons/social/IconGoogle';
import { IconBehance } from '@/ui/icons/social/IconBehance';
import { IconLink } from '@/ui/icons/general/IconLink';
import { IconEyeOff } from '@/ui/icons/general/IconEyeOff';
import { IconEyeOn } from '@/ui/icons/general/IconEyeOn';
import { IconCheckboxEmpty } from '@/ui/icons/general/IconCheckboxEmpty';
import { IconCheckboxFilled } from '@/ui/icons/general/IconCheckboxFilled';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import { IconSearch } from '@/ui/icons/general/IconSearch';
import { IconSend } from '@/ui/icons/general/IconSend';
import { IconNotification } from '@/ui/icons/general/IconNotification';
import { IconNotificationBadged } from '@/ui/icons/general/IconNotificationBadged';
import { IconLockLocked } from '@/ui/icons/general/IconLockLocked';
import { IconLogOut } from '@/ui/icons/general/IconLogOut';
import { IconSwitchOff } from '@/ui/icons/general/IconSwitchOff';
import { IconSwitchOn } from '@/ui/icons/general/IconSwitchOn';
import { IconPlus } from '@/ui/icons/general/IconPlus';
import { IconMinus } from '@/ui/icons/general/IconMinus';
import { IconClose } from '@/ui/icons/general/IconClose';
import { IconDotsHorizontal } from '@/ui/icons/general/IconDotsHorizontal';

export const UiKitIcons = () => (
  <>
    <div className="cell large-full mb-24">
      <h2 className={typography.accentTitle}>Icons</h2>
    </div>
    <div className={cn('cell large-full mb-32', styles.rowItemIcons)}>
      <IconGithub />
      <IconLinkedin />
      <IconGoogle />
      <IconBehance />
      <IconLink />
      <IconEyeOff />
      <IconEyeOn />
      <IconCheckboxEmpty />
      <IconCheckboxFilled />
      <IconCheck />
      <IconSearch />
      <IconSend />
      <IconNotification />
      <IconNotificationBadged />
      <IconLockLocked />
      <IconLogOut />
      <IconSwitchOff />
      <IconSwitchOn />
      <IconPlus />
      <IconMinus />
      <IconClose />
      <IconDotsHorizontal />
    </div>
  </>
);
