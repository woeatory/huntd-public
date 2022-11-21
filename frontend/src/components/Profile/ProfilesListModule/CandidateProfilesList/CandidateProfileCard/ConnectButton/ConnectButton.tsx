import React, { memo, DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import { Button } from '@/ui/buttons/Button';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { IconCheck } from '@/ui/icons/general/IconCheck';
import { Selectors } from '@/lib/selectors';

interface Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  loading: boolean;
  completed?: boolean;
}
export const ConnectButton = memo<Props>(
  (props) => {
    const { t } = useTranslation([Namespaces.Form]);
    const { loading, completed, className } = props;

    return (
      <div>
        <Button
          mode={Button.mode.Primary}
          type="submit"
          disabled={loading || completed}
          className={cn(className, {
            [Selectors.Hidden]: completed,
          })}
          text={t(`${Namespaces.Form}:send-message-button`)}
        />

        {completed && <IconCheck />}
      </div>
    );
  },
);
