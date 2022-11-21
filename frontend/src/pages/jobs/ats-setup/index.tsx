import React from 'react';
import cn from 'classnames';
import { withApolloSSR } from '@/controllers/apollo/apollo.hocs/withApolloSSR';
import { compose } from '@/lib/compose';
import { withNamespaces } from '@/controllers/i18n/i18n.hocs/withNamespaces';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { withAuthUserPage } from '@/controllers/page/page.quards/withAuthUserPage';
import { ATSSelectorModule } from '@/components/Vacancies/ATSSelectorModule';
import { withLayout } from '@/controllers/layout/layout.hocs/withLayout';
import { DynamicLayout } from '@/components/Base/Layout/DynamicLayout';

const ChooseATS = () => {
  const { t } = useTranslation([Namespaces.Ats]);

  return (
    <>
      <div className="grid-container mt-80">
        <div className="grid-x grid-margin-x">
          <div className="cell large-6 large-offset-3">
            <h1 className={cn(typography.h1, 'mb-40')}>
              {t(`${Namespaces.Ats}:choose_ats_title`)}
            </h1>
          </div>
        </div>
      </div>

      <ATSSelectorModule />
    </>
  );
};

export default compose(
  withLayout(DynamicLayout),
  withApolloSSR,
  withNamespaces([Namespaces.Ats]),
  withAuthUserPage(),
)(ChooseATS);
