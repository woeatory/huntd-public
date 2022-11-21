import React, { FC } from 'react';
import cn from 'classnames';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { LandingSignUpModule, SignUpModuleMode } from '@/components/Authentication/LandingSignUpModule/LandingSignUpModule';
import styles from './NewHeroBlock.module.scss';
import { HomepageGlobeBlock } from '../HomepageGlobeBlock/HomepageGlobeBlock';
import { GlobeVacancies } from '../HomepageGlobeBlock/GlobeVacancies';

export const NewHeroBlock: FC = () => {
  const { t } = useTranslation(Namespaces.Home);

  return (
    <div className={cn(styles.heroBlockWrapper, 'grid-x grid-margin-x medium-mt-136')}>
      <h2 className={cn(styles.title, 'cell large-8 mb-16')}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          disallowedElements={['p']}
          unwrapDisallowed
        >
          {t(`${Namespaces.Home}:homepage_web3_title`)}
        </ReactMarkdown>
      </h2>
      <p className={cn(typography.alertText, styles.subtitle,
        'cell large-6 medium-7 c-semidark-chocolate mb-40 small-mb-24')}
      >
        {t(`${Namespaces.Home}:new_homepage_subtitle`)}
      </p>

      <div className="mb-32 medium-mb-72 small-mb-128">
        <LandingSignUpModule mode={SignUpModuleMode.Candidate} />
      </div>

      <div className={cn(styles.containerForVacancies, 'medium-mb-32 mb-16 small-mb-112 large-12')}>
        <div className={cn(styles.globeBlockOuterContainer)}>
          <div className={cn(styles.globeBlockContainer, 'cell large-12')}>
            <HomepageGlobeBlock />
          </div>
        </div>
        <GlobeVacancies />
      </div>
    </div>
  );
};
