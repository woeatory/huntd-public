import React from 'react';
import cn from 'classnames';
import { FAQItem } from '@/components/GeneralContent/FAQ/FAQItem';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { QUESTIONS } from '@/components/GeneralContent/FAQ/constants';
import styles from './FAQ.module.scss';

export const FAQ = () => {
  const { t } = useTranslation([Namespaces.Pricing]);

  return (
    <div className="grid-x align-center c-semidark-chocolate">
      <section className="cell large-8 mt-64 mb-120">
        <h2 className={cn(styles.title, 'mb-32')}>
          {t(`${Namespaces.Pricing}:pricing_faq_title`)}
        </h2>
        {QUESTIONS.map((item) => (
          <FAQItem
            item={item}
            key={item.question}
          />
        ))}
      </section>
    </div>
  );
};
