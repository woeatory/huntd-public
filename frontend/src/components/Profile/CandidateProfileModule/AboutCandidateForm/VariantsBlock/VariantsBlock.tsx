import React, { FC, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import typography from '@/ui/typography/typography.module.scss';
import { IconChevronDown } from '@/ui/icons/general/IconChevronDown';
import { IconChevronUp } from '@/ui/icons/general/IconChevronUp';
import styles from './VariantsBlock.module.scss';

interface Props {
  text: string;
  isOpen?: boolean;
}

export const VariantsBlock: FC<Props> = (props) => {
  const { text, isOpen } = props;
  const [isExampleOpen, setIsExampleOpen] = useState(isOpen);

  const splitText = text.split('\n');

  const { t } = useTranslation([Namespaces.Form]);

  return (
    <div className='mb-32'>
      <button
        type="button"
        className={styles.exampleButton}
        onClick={() => setIsExampleOpen(!isExampleOpen)}
      >
        {t(`${Namespaces.Form}:example`)}
        {isExampleOpen ? <IconChevronUp /> : <IconChevronDown /> }
      </button>
      <div className={cn(styles.examplesContainer, 'mb-32', {
        [styles.overlay]: isExampleOpen,
      })}
      >
        <div className={typography.smallText}>
          {splitText.map((sentence) => (
            <p className="c-semidark-chocolate" key={sentence}>
              {sentence}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
