import React from 'react';
import cn from 'classnames';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { DynamicLayout } from '@/components/Base/Layout/DynamicLayout';
import { Button } from '@/ui/buttons/Button';
import { Routes } from '@/controllers/router/router.constants';

const ChooseATS = () => {
  const { t } = useTranslation([Namespaces.Ats, Namespaces.Common]);

  return (
    <div className="grid-container mt-80">
      <div className="grid-x grid-margin-x">
        <div className="cell large-2 large-offset-3">
          <h1 className={cn(typography.h1, 'mb-8')}>
            {t(`${Namespaces.Ats}:success_ats_title`)}
          </h1>
        </div>
      </div>

      <div className="grid-x grid-margin-x">
        <div className='cell large-5 large-offset-3 mb-40'>
          <p className={cn(typography.text, 'c-gray')}>
            {t(`${Namespaces.Ats}:success_ats_description`)}
          </p>
        </div>

        <Button
          className='cell large-3 medium-6 large-offset-3'
          href={Routes.Candidates}
          mode={Button.mode.Primary}
          size={Button.size.LargeWide}
          text={t(`${Namespaces.Common}:search_candidates`)}
        />
      </div>
    </div>
  );
};

export default compose(
  withLayout(DynamicLayout),
  withApolloSSR,
  withNamespaces([Namespaces.Ats, Namespaces.Common]),
  withAuthUserPage(),
)(ChooseATS);
