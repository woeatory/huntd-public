import React from 'react';
import { useTranslation } from '@/controllers/i18n/i18n.hooks/useTranslation';
import { Namespaces } from '@/controllers/i18n/i18n.typedefs';
import { Button } from '@/ui/buttons/Button';
import { useSendRecruiterProfileToReview } from '@/controllers/recruiterProfile/recruiterProfile.hooks.ts/useSendRecruiterProfileToReview';

export const ActivateRecruiterProfileButton = () => {
  const [mutate, { loading }] = useSendRecruiterProfileToReview();

  const { t } = useTranslation([Namespaces.Profile]);

  return (
    <Button
      type="button"
      onClick={() => mutate()}
      disabled={loading}
      mode={Button.mode.Primary}
      size={Button.size.Small}
      text={t(`${Namespaces.Profile}:activate_profile`)}
    />
  );
};
