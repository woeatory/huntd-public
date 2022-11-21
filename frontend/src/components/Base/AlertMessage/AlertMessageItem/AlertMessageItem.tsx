import React, { FC } from 'react';
import cn from 'classnames';
import { Cta, Maybe } from '@/controllers/graphql/generated';
import { AlertMessageType } from '@/controllers/alertMessage/alertMessage.typedefs';
import styles from '@/components/Base/AlertMessage/AlertMessageItem/AlertMessageItem.module.scss';
import typography from '@/ui/typography/typography.module.scss';
import { Button } from '@/ui/buttons/Button';

interface Props {
  type: AlertMessageType;
  heading: string;
  text: string;
  cta?: Maybe<Cta>;
}

export const AlertMessageItem: FC<Props> = (props) => {
  const {
    heading, text, type, cta,
  } = props;

  return (
    <div className={cn(styles.item, styles[type.toLowerCase()])}>
      <strong
        className={cn(
          styles.title,
          typography.smallCaption,
          'c-semidark-chocolate mb-4',
        )}
      >
        {heading}
      </strong>
      <div className={styles.alertText}>
        <p
          role="alert"
          className={cn(
            typography.smallText,
            styles.text,
            'c-gray',
          )}
        >
          {text}
        </p>
        {cta && (
          <Button
            className={styles.ctaBtn}
            mode={Button.mode.BorderLess}
            size={Button.size.Tiny}
            text={cta.title}
            href={cta.link}
          />
        )}
      </div>
    </div>
  );
};
