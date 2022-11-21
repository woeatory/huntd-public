import React from 'react';
import cn from 'classnames';
import { IconStar } from '@/ui/icons/general/IconStar';
import typography from '@/ui/typography/typography.module.scss';
import styles from './VacancyMeta.module.scss';

interface Props {
  items: string[]
}

export const VacancyMeta = React.memo<Props>((props) => {
  const { items } = props;

  return (
    <>
      {items.length > 0 && (
      <ul className={cn(styles.metaWrapper, 'mb-24')}>
        {items.map((item, index) => (
          <li
            className={cn(
              styles.metaItem,
              typography.smallCaption, {
                [styles.firstMetaItem]: index === 0,
              },
            )}
            key={item}
          >
            <IconStar />
            {item}
          </li>
        ))}
      </ul>
      )}
    </>
  );
});
