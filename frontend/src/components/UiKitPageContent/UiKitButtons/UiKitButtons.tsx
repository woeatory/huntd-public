import cn from 'classnames';
import React from 'react';
import typography from '@/ui/typography/typography.module.scss';
import styles from '@/components/UiKitPageContent/UiKitPageContent.module.scss';
import { Button } from '@/ui/buttons/Button';
import { Routes } from '@/controllers/router/router.constants';

export const UiKitButtons = () => (
  <>
    <div className="cell large-full mb-24">
      <h2 className={typography.accentTitle}>Buttons: Primary button</h2>
    </div>
    <div className={cn('cell large-full mb-32', styles.rowItem)}>
      <Button
        mode={Button.mode.Primary}
        text='Default'
      />

      <Button
        mode={Button.mode.Primary}
        text='Disabled'
        disabled
      />

    </div>
    <div className="cell large-full mb-24">
      <h2 className={typography.accentTitle}>Buttons: Secondary button</h2>
    </div>
    <div className={cn('cell large-full mb-32', styles.rowItem)}>
      <Button
        mode={Button.mode.Secondary}
        text='Default'
      />

      <Button
        mode={Button.mode.Secondary}
        text='Disabled'
        disabled
      />
    </div>

    <div className="cell large-full mb-24">
      <h2 className={typography.accentTitle}>Buttons: Link as button</h2>
    </div>
    <div className={cn('cell large-full mb-32', styles.rowItem)}>
      <Button
        mode={Button.mode.Primary}
        href={Routes.Candidates}
        text='Default'
      />

      <Button
        mode={Button.mode.Secondary}
        href={Routes.Candidates}
        text='Default'
      />
    </div>
  </>
);
