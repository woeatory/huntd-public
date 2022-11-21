import React, { FC, useState } from 'react';
import cn from 'classnames';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { IconPlus } from '@/ui/icons/general/IconPlus';
import { IconMinus } from '@/ui/icons/general/IconMinus';
import styles from './FAQ.module.scss';

interface Item {
  question: string;
  answer: string;
}

interface Props {
  item: Item;
}

export const FAQItem: FC<Props> = ({ item }) => {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const { t } = useTranslation([Namespaces.Pricing]);

  return (
    <div className={styles.faqItem}>
      <button
        type="button"
        className={styles.question}
        onClick={() => setIsQuestionOpen(!isQuestionOpen)}
      >
        {t(item.question)}
        {isQuestionOpen ? <IconMinus /> : <IconPlus />}
      </button>
      <div
        className={cn(styles.answer, {
          [styles.overlay]: isQuestionOpen,
        })}
      >
        {t(item.answer)}
      </div>
    </div>
  );
};
