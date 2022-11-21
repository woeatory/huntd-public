import React, { FC } from 'react';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { DashedLineHorizontal } from '@/ui/icons/general/DashedLineHorizontal';
import { SignUpCandidate } from '@/components/Authentication/LandingSignUpModule/SignUpCandidate';
import { SignUpPresubscribedForm } from '@/components/Authentication/SignUpModule/SignUpPresubscribedForm/SignUpPresubscribedForm';
import { SignUpPresubscribedSocial } from '@/components/Authentication/SignUpModule/SignUpPresubscribedSocial';
import { SignUpSocial, SignUpSocialMode } from '@/components/Authentication/SignUpModule/SignUpSocial';
import styles from './LandingSignUpModule.module.scss';

interface Props {
  mode: SignUpModuleMode;
}

export enum SignUpModuleMode {
  Candidate = 'candidate',
  Recruiter = 'recruiter',
}

export const LandingSignUpModule: FC<Props> = ({ mode }) => {
  const { t } = useTranslation([Namespaces.Home]);

  return (
    <div className={cn(styles.wrapper, 'grid-x grid-margin-x')}>
      <h2 className={cn(typography.underhead, 'mb-24')}>
        {mode === SignUpModuleMode.Candidate
          ? t(`${Namespaces.Home}:new_homepage_signup_title`)
          : t(`${Namespaces.Form}:engineers_sign_up_title`)}
      </h2>

      <div className="mb-24">
        {mode === SignUpModuleMode.Candidate
          ? <SignUpSocial mode={SignUpSocialMode.Horizontal} />
          : <SignUpPresubscribedSocial />}
      </div>

      <div className={cn(styles.dividerContainer, 'mb-24 cell')}>
        <DashedLineHorizontal imageWidth="288" />
      </div>

      <div className={cn(styles.signUpInput, 'mb-12 cell')}>
        {mode === SignUpModuleMode.Candidate
          ? <SignUpCandidate />
          : <SignUpPresubscribedForm />}
      </div>

      {mode === SignUpModuleMode.Candidate && (
        <span className={typography.smallCaption}>
          {t(`${Namespaces.Home}:new_homepage_signup_end`)}
        </span>
      )}
    </div>
  );
};
