import React, {
  FC, useCallback, useEffect, useRef,
} from 'react';
import cn from 'classnames';
import { FlashMessage, FlashMessageType } from '@/controllers/graphql/generated';
import { useFlashMessage } from '@/controllers/flashMessage/flashMesage.hooks/useFlashMessage';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { IconClose } from '@/ui/icons/general/IconClose';
import typography from '@/ui/typography/typography.module.scss';
import { IconWarning } from '@/ui/icons/general/IconWarning';
import { IconInfo } from '@/ui/icons/general/IconInfo';
import { Link } from '@/controllers/i18n/i18n.client';
import buttons from '@/ui/buttons/buttons.module.scss';
import styles from './FlashMessageItem.module.scss';

type Props = FlashMessage;

const getMessageIcon = (type: FlashMessageType) => {
  switch (type) {
    case FlashMessageType.Error:
    case FlashMessageType.Warning: {
      return IconWarning;
    }

    default: {
      return IconInfo;
    }
  }
};

export const FlashMessageItem: FC<Props> = (props) => {
  const {
    id, heading, text, type, cta,
  } = props;

  const { deleteMessage } = useFlashMessage();

  const { t } = useTranslation(Namespaces.Common);

  const deleteCallback = useCallback(() => {
    deleteMessage({
      variables: {
        id,
      },
    });
  }, [id, deleteMessage]);

  const timer = useRef<number | null>(null);

  const setTimer = useCallback((delay = 5000) => {
    timer.current = window.setTimeout(
      deleteCallback, delay,
    );
  }, [deleteCallback]);

  const clearTimer = useCallback(() => {
    if (timer.current) {
      window.clearTimeout(timer.current);
    }
  }, []);

  useEffect(() => {
    setTimer();

    return clearTimer;
  }, [setTimer, clearTimer]);

  const Icon = getMessageIcon(type);

  return (
    <div
      className={cn(styles.item, type.toLowerCase())}
      onMouseEnter={clearTimer}
      onMouseLeave={() => setTimer(2000)}
    >
      <div className={styles.statusIcon}>
        <Icon />
      </div>
      <button
        type="button"
        title={t(`${Namespaces.Common}:flash_message_close`)}
        aria-label={t(`${Namespaces.Common}:flash_message_close`)}
        className={styles.closeButton}
        onClick={deleteCallback}
      >
        <IconClose />
      </button>
      <strong
        className={cn(styles.profileTitle, typography.caption, 'c-semidark-chocolate')}
      >
        {heading}
      </strong>
      <p role="alert" className={cn(styles.text, 'pb-8 c-gray')}>{text}</p>
      {cta && (
        <Link href={cta.link}>
          <a
            className={cn(styles.ctaBtn, buttons.primary, 'button-primary')}
          >
            {cta.title}
          </a>
        </Link>
      )}
    </div>
  );
};
